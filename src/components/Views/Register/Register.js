import React from 'react';
import '../Register/Register.css';
import logo from '../../Images/BEATCAVE_WHITE_180.png';

/**
 * Function creates the registration form.
 * @param {*} props - users registration credentials.
 * @returns registration form.
 */
export default function Registration(props){

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 

  today = yyyy+'-'+mm+'-'+dd;

    return(
      <div className="register-wrapper">
        <img src={logo} className="logo-login-register" alt="Beatcave logo"/>
        <div className="register-form-wrapper">
          <form onSubmit={props.handleSubmit}>
            <h3 className="register-text">Sign Up</h3>
            <div>
              <input 
                type="text" 
                className="register-firstname-input" 
                placeholder="First Name" 
                name="firstname"
                value={props.firstname}
                onChange={props.handleChange}
                required
              />
              <input 
                type="text" 
                className="register-lastname-input" 
                placeholder="Last Name" 
                name="lastname"
                value={props.lastname}
                onChange={props.handleChange}
                required
              />
              <br/>
              <input 
                type="text" 
                className="register-email-input" 
                placeholder="Email" 
                name="email"
                value={props.email}
                onChange={props.handleChange}
                required
              />
              <input type="text" 
                className="register-address-input" 
                placeholder="Artist Name"
                name="artistname"
                value={props.artistname}
                onChange={props.handleChange}
              />
              <br/>
              <input 
                type="number" 
                className="register-phone-input" 
                placeholder="Phone" 
                name="phonenumber"
                value={props.phonenumber}
                onChange={props.handleChange}
                required
              />
              <input 
                type="date" 
                className="register-birthdate-input" 
                name="birthdate"
                value={props.birthdate}
                onChange={props.handleChange}
                max={today}
                required
              />
              <br/>
              <input 
              type="password" 
              className="register-password-input"
              placeholder="Password" 
              name="password"
              value={props.password}
              onChange={props.handleChange}
              autoComplete="on"
              required
              />
              <input 
              type="password" 
              className="register-confirmpassword-input" 
              placeholder="Confirm Password"
              name="confirmpassword"
              value={props.confirmpassword} 
              onChange={props.handleChange} 
              autoComplete="on"
              required
              />
              <br/>
              <button className="register-button">Sign Up</button>
            </div>
          </form>
          <button className="register-login-button" onClick={props.setShowLogin}>Already have an account? Log in.</button>
        </div>
      </div>
    )
  }