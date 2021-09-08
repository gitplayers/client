import React from 'react';
import "./style.css";
import { images } from '../../Helpers';

const Header = () => {
	return (
		<section role="logo" className="header">
            <img src={images['logo.png'].default}></img>
		</section>
	);
};

export default Header;
