import React from 'react';
import '../Login/Login.css';
import '../Register/Register.css';
import '../Signout/Signout.css'
import logo from '../../Images/BEATCAVE_WHITE_180.png';


/**
 * Function removes JWT token.
 */
function DeleteJWT(){
  try{
    sessionStorage.removeItem("token");
    window.location.href="/home";
    console.log(sessionStorage.getItem("token"));
  } catch (error) {
    console.log(error);
  }

}

/**
 * Function creates Signout view.
 * @returns Signout display.
 */
function SignoutView(){
  return(
    <div className="signout-button-wrapper">
       <img src={logo} className="home-logo" alt="Beatcave Logo"/>
       <h3>Are you sure you want to signout?</h3>
        <button onClick={() => DeleteJWT()}>Signout</button>
    </div>
  )
}

/**
 * Signout component.
 */
export default class Signout extends React.Component{


  /**
   * Components render function.
   * @returns Rendered signout view
   */
  render(){
    return(
      <div className="signout-wrapper">
        <SignoutView/>
      </div>
    )
  }
}