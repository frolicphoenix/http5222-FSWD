import {useState} from "react";
import Logo from './Logo.jsx';

export default function Navbar(props) {
    
    return (
        <div className='nav-wrapper'>
            <Logo />
            <ul className='nav'>
                <li className="nav-links" href="linkHref">Studios</li>
                <li className="nav-links" href="linkHref">Productions</li>
            </ul>
        </div>
    );
}