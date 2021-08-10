import React from 'react';

const DropdownMenu = () => {
	const DropdownItem = (props) => {
		return (
			<a href='#' className='menu-item'>
				<span className='icon-btn'>{props.leftIcon}</span>
				{props.children}
				<span className='icon-btn icon-right'>{props.rightIcon}</span>
			</a>
		);
	};

	return (
		<div className='dropdown'>
			<DropdownItem leftIcon='😃' rightIcon='😃'>
				My Profile
			</DropdownItem>
			<DropdownItem leftIcon='😃' rightIcon='😃'>
				My Profile
			</DropdownItem>
		</div>
	);
};

export default DropdownMenu;
