import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {ReactComponent as Burger} from '../Icons/menu_white_24dp.svg';
import {ReactComponent as Profile} from '../Icons/person_white_24dp.svg';
import {ReactComponent as Beats} from '../Icons/music_note_white_24dp.svg';
import {ReactComponent as Money} from '../Icons/attach_money_white_24dp.svg';
import {ReactComponent as SignOut} from '../Icons/logout_white_24dp.svg';


//https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe <-------- showing drop down tutorial.

function NavbarLink(props){
    return(
        <li><Link to={props.to}>{props.text}</Link></li>
    )
}

function DropdownIcon(props){
    return (
        <li className="dropdown-button">
            {props.icon}
        </li>
    );
}


function Dropdown(props) {
    return(
        <div className="dropdown">
            <div className="menu">
                <a href="http://localhost:3000/profile" className="menu-item">
                    <span className="icon-button">{<Profile/>}</span>
                    Profile
                </a>
                <a href="http://localhost:3000/products" className="menu-item">
                    <span className="icon-button">{<Beats/>}</span>
                    Products
                </a>
                <a href="http://localhost:3000/purchases" className="menu-item">
                    <span className="icon-button">{<Money/>}</span>
                    Purchases
                </a>
                <a href="http://localhost:3000/signout" className="menu-item">
                    <span className="icon-button">{<SignOut/>}</span>
                    Sign Out
                </a>
            </div>
        </div>
    )
        
    
}



class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDropdown: false,
        }
    }

    showDropdown(event){
        event.preventDefault();
        if(this.state.showDropdown === false){
            this.setState({ 
                showDropdown: true,
            });
        }else{
            this.setState({ 
                showDropdown: false,
            });
        }
    }

    
    render(props){
        return(
            <nav className="navbar-wrapper">
                <h1 className="logo">BEATCAVE</h1>
                <ul className="main-links">
                    <NavbarLink to="/home" text="Home"/>
                    <NavbarLink to="/beats" text="Beats"/>
                    <NavbarLink to="/events" text="Events"/>
                    <NavbarLink to="/about" text="About"/> 
                </ul>
                <a href="ref" className="button" onClick={e => this.showDropdown(e)}>
                    <DropdownIcon icon={<Burger/>}/>
                </a>

                {
                    this.state.showDropdown
                    ?(
                        <Dropdown/>
                    )
                    :(
                        null
                    )
                }
            </nav>
        )
    }
}

export default Navbar;