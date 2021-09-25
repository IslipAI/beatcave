import React from 'react';
import '../Login/Login.css';
import '../Register/Register.css';
import logo from '../../Images/BEATCAVE_WHITE_180.png';


export default class Signout extends React.Component{


  deleteJWT(){
    try{
      sessionStorage.removeItem("token");
      window.location.reload();
      console.log(sessionStorage.getItem("token"));
    } catch (error) {
      console.log(error);
    }
  }

  signoutView(){
    return(
      <div className="signout-wrapper">
         <h3>Are you sure you want to signout?</h3>
         <button onClick={() => this.deleteJWT()}>Signout</button>
      </div>
    )
  }


  render(){
    return(
        this.signoutView()
    )
  }
}