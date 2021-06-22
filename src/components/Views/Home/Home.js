import React, {Component} from 'react';
import './Home.css';
import logo from '../../Images/BEATCAVE_BLACK_1332x.png';

export default class Home extends Component{




  render(){
    return(
      <div className="home-wrapper">
        <ul className="home-list">
          <img src={logo} className="home-logo" alt="Beatcave Logo"/>
          <h3 className="home-slogan">Welcome to the Cave. Find your inner creative.</h3>
        </ul>
      </div>
    );
  }
}