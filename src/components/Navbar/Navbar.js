import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {ReactComponent as Burger} from '../Icons/menu_white.svg';
import {CSSTransition} from 'react-transition-group';

function NavbarLink(props){
    return(
        <li><Link to={props.to}>{props.text}</Link></li>
    )
}

function DropdownIcon(props){
    const [open, setOpen] = useState(false);

    return (
        <li className="dropdown-button">
        <a className="button" onClick={() => setOpen(!open)}>
            {props.icon}
        </a>
        {open}
        </li>
    );
}


class Navbar extends Component{

    render(){
        return(
            <nav className="navbar-wrapper">
                <h1 className="logo">BEATCAVE</h1>
                <ul className="main-links">
                    <NavbarLink to="/home" text="Home"/>
                    <NavbarLink to="/beats" text="Beats"/>
                    <NavbarLink to="/events" text="Events"/>
                    <NavbarLink to="/about" text="About"/> 
                </ul>
                <DropdownIcon icon={<Burger/>}/>
            </nav>
        )
    }
}

export default Navbar;