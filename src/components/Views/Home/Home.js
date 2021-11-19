import React, {Component} from 'react';
import './Home.css';
import logo from '../../Images/BEATCAVE_BLACK_1332x.png';
import volumeOne from '../../Images/beatcave_ep_volume_one.jpg';
import volumeTwo from '../../Images/beatcave_ep_volume_two.jpg';
import sickNatureThree from '../../Images/beatcave_sick_nature_three.jpg';
import sickNatureTwo from '../../Images/beatcave_sick_nature_two.jpg';
import sickNatureOne from '../../Images/beatcave_sick_nature_one.jpg';
import camp from '../../Images/beatcave_camp.jpg';


/**
 * Home Component
 */
export default class Home extends Component{

  /**
   * Components render method.
   * @returns Home page
   */
  render(){
    return(
      <div className="home-wrapper" id="home-wrapper">
        <ul className="home-list">
          <div>
            <img src={logo} className="home-logo" alt="Beatcave Logo"/>
            <h3 className="home-slogan">Welcome to the Cave. Find your inner creative.</h3>
          </div>
          <img src={volumeOne} className="home-picture" alt="beatcave volume one"/>
          <img src={volumeTwo} className="home-picture" alt="beatacve camp tape"/>
          <br/>
          <img src={sickNatureTwo} className="home-picture" alt="beatcave volume one"/>
          <img src={camp} className="home-picture" alt="beatacve camp tape"/>
          <br/>
          <img src={sickNatureOne} className="home-picture" alt="beatcave volume one"/>
          <img src={sickNatureThree} className="home-picture" alt="beatacve camp tape"/>
        </ul>
      </div>
    );
  }
}