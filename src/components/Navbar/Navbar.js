import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {ReactComponent as Burger} from '../Icons/menu_white_24dp.svg';
import {ReactComponent as AddCart} from '../Icons/shopping_cart_white_24dp.svg';
import {ReactComponent as Profile} from '../Icons/person_white_24dp.svg';
import {ReactComponent as Beats} from '../Icons/music_note_white_24dp.svg';
import {ReactComponent as Money} from '../Icons/attach_money_white_24dp.svg';
import {ReactComponent as SignOut} from '../Icons/logout_white_24dp.svg';
import {ReactComponent as Admin} from '../Icons/admin_24dp.svg';
import Cart from '../Views/Cart/Cart';


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

//NEEDS WORK
// function CartIcon(props){
//     return (
//         <li className="cart-button">
//             <Link className='testclass' to='/cart'>{props.icon}</Link>
//         </li>
//     );
// }

function Dropdown(props) {
    console.log(props.adminStatus)
    if(props.adminStatus === true){
        return(
            <div className="dropdown">
                <div className="menu">
                    <a href="profile" className="menu-item">
                        <span className="icon-button">{<Profile/>}</span>
                        Profile
                    </a>
                    <a href="products" className="menu-item">
                        <span className="icon-button">{<Beats/>}</span>
                        Products
                    </a>
                    <a href="purchases" className="menu-item">
                        <span className="icon-button">{<Money/>}</span>
                        Purchases
                    </a>
                    <a href="cart" className="menu-item">
                        <span className="icon-button">{<AddCart/>}</span>
                        Cart
                    </a>
                    <a href="admin" className="menu-item">
                        <span className="icon-button">{<Admin/>}</span>
                        Admin
                    </a>
                    <a href="signout" className="menu-item">
                        <span className="icon-button">{<SignOut/>}</span>
                        Sign Out
                    </a>
                </div>
            </div>
        )
    }else{
        return(
            <div className="dropdown">
                <div className="menu">
                    <a href="profile" className="menu-item">
                        <span className="icon-button">{<Profile/>}</span>
                        Profile
                    </a>
                    <a href="products" className="menu-item">
                        <span className="icon-button">{<Beats/>}</span>
                        Products
                    </a>
                    <a href="purchases" className="menu-item">
                        <span className="icon-button">{<Money/>}</span>
                        Purchases
                    </a>
                    <a href="cart" className="menu-item">
                        <span className="icon-button">{<AddCart/>}</span>
                        Cart
                    </a>
                    <a href="signout" className="menu-item">
                        <span className="icon-button">{<SignOut/>}</span>
                        Sign Out
                    </a>
                </div>
            </div>
        )
    }
}



class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: "",
            showDropdown: false,
            admin: false,
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

    checkAdmin(){
        const storedToken = sessionStorage.getItem('token');
        if(storedToken != null){
            var tokenBody = storedToken.split('.')[1];
            //console.log(tokenBody);

            var tokenBodyDecoded = Buffer.from(tokenBody, 'base64').toString();
            //console.log(tokenBodyDecoded);

            const tokenBodyJson = JSON.parse(tokenBodyDecoded);
            //console.log(tokenBodyJson.admin);

            if(tokenBodyJson.admin === "A"){
                this.setState({
                    admin: true
                });
            }else{
                this.setState({
                    admin: false
                });
            }
        }
    }

     componentDidMount(){
        this.checkAdmin();
    }   
    
    render(){
        return(
            <nav className="navbar-wrapper">
                <h1 className="logo">BEATCAVE</h1>
                <ul className="main-links">
                    <NavbarLink to="/home" text="HOME"/>
                    <NavbarLink to="/beats" text="BEATS"/>
                    <NavbarLink to="/events" text="EVENTS"/>
                    <NavbarLink to="/about" text="ABOUT"/> 
                </ul>
                {/* <ul className="main-links">
                    <CartIcon icon={<AddCart/>}/>
                </ul> */}
                <a href="ref" className="button" onClick={e => this.showDropdown(e)}>
                    <DropdownIcon icon={<Burger/>}/>
                </a>

                {
                    this.state.showDropdown
                    ?(
                        <Dropdown adminStatus={this.state.admin}/>
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