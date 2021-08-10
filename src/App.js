import Navbar from './components/Navbar';
import NavItem from './components/NavItem';
import DropdownMenu from './components/DropdownMenu';
import './index.css';

import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

try {
	firebase.initializeApp({
		apiKey: 'AIzaSyAv8G82TyAr6L8LV7GhR6RTFcSDZ6NhT1I',
		authDomain: 'chat-9c638.firebaseapp.com',
		projectId: 'chat-9c638',
		storageBucket: 'chat-9c638.appspot.com',
		messagingSenderId: '599604947712',
		appId: '1:599604947712:web:81c99429bbe0cd86eaa1e5',
		measurementId: 'G-MFJ5W28NGB',
	});
} catch (err) {
	console.log(err);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	const [user] = useAuthState(auth);

	return (
		<>
			<Navbar>
				<NavItem icon='😃' />
				<NavItem icon='😃' />
				<NavItem icon='😃' />
				<NavItem icon='😃'>
					<DropdownMenu />
				</NavItem>
			</Navbar>

			{user ? <Chat /> : <SignIn />}
			<SignOut />
		</>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
	);
}

const Chat = () => {
	const ref = firestore.collection('messages');
	let query = ref.orderBy('createdAt');
	const [messages] = useCollectionData(query, { idField: 'id' });

	const [formValue, setFormValue] = useState('');
	const submit = async (e) => {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		formValue.length !== 0 &&
			(await ref.add({
				text: formValue,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid,
				photoURL,
			}));

		setFormValue('');
	};

	return (
		<div className='chat'>
			<div className='chat-msg'>
				{messages &&
					messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
			</div>
			<form>
				<input
					type='text'
					value={formValue}
					id='chat-box'
					onChange={(e) => {
						setFormValue(e.target.value);
					}}
				/>

				<button type='button' id='chat-send' onClick={submit}>
					😃
				</button>
			</form>
		</div>
	);
};

const ChatMessage = (props) => {
	const { text, uid, photoURL } = props.message;
	const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
	return (
		<div className={`msg-wrap`}>
			{messageClass === 'received' && <img src={photoURL} alt='' />}
			<div className={`msg ${messageClass}`}>
				<p>{text}</p>
			</div>
			{messageClass === 'sent' && <img src={photoURL} alt='' />}
		</div>
	);
};

export default App;
