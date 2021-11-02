import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import './SideNavbar.css';

export default function SideNavbar(){
    return(
        <div>
            <div id="mySidenav" className="sidenav">
            <a href="#!" className="closebtn" onClick={closeNav}>&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
            </div>

            <button onClick={openNav}>open</button>

            <div id="main">
            ...
            </div>
        </div>
    );
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }