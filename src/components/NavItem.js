import React, { useState } from 'react';

const NavItem = (props) => {
	const [open, setOpen] = useState(false);

	return (
		<li className='nav-item'>
			<a href='#' className='icon-btn' onClick={() => setOpen(!open)}>
				{props.icon}
			</a>

			{open && props.children}
		</li>
	);
};

export default NavItem;
