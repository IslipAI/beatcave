import React from 'react';
import '../Login/Login.css';
import '../Register/Register.css';
import logo from '../../Images/BEATCAVE_WHITE_180.png';


export default class Signout extends React.Component{
  constructor(props) {
    super();
    this.state = {
      firstname: "",

    };
  }


  SignoutView(){
    return(
      <div className="signout-wrapper">
         <img src={logo} className="logo-login-register" alt="Beatcave Logo"/>
         <h3>Are you sure you want to signout?</h3>
      </div>
    )
  }


  render(){
    return(
        this.SignoutView()
    )
  }
}