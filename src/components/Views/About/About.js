import React from 'react';
import './About.css';
import beatcaveBlack from '../../Images/beatcave_black_background_white_text.jpg';

/**
 * The About page.
 * @returns About Page
 */
export default function About() {
  return(
    <div className="about-wrapper">
    <ul className="about-list">
      <h1 className="about-title">ABOUT</h1>
      <img src={beatcaveBlack} className="about-beatcave-logo" alt="Beatcave Logo"/>
      <div className="about-content-wrapper">
        <h4>ABOUT US</h4>
        <div>
        <p>Beatcave started with the vision of bringing producers out of their bedrooms and into community. 
          Our first events centered around beat deconstructions and critiques from industry professionals. 
          What started for producers quickly turned into a community for engineers and artists as well.</p>
        </div>
      </div>
    </ul>
  </div>
  );
}