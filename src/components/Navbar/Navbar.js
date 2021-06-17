import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component{
    state = {clicked: false}

    handleClick = () =>{
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="navbar-wrapper">
                <h1 className="logo">BEATCAVE</h1>
                <ul className="main-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/beats">Beats</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/about">About</Link></li>  
                </ul>
                <div className="icons">
                    <div className ="menuIcon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;