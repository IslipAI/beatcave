import React from 'react';
import '../Login/Login.css';
import logo from '../../Images/BEATCAVE_WHITE_180.png';

export default function Login(props){
    return(
      <div className="login-wrapper">
         <img src={logo} className="logo-login-register" alt="Beatcave Logo"/>
        <div className="login-form-wrapper">
        <form onSubmit={props.handleSubmit}>
          <h3 className="login-text">Log In</h3>
          <div>
            <input 
              className="login-email-input" 
              type="text" 
              placeholder="Email" 
              name="email"
              value={props.email}
              onChange={props.handleChange}
              required
            />
            <br/>
            <input 
            className="login-password-input" 
            type="password" 
            placeholder="Password" 
            name="password"
            value={props.password}
            onChange={props.handleChange} 
            autoComplete="on"
            required
            />
            <br/>
            <button className="login-button">Log In</button>
          </div>
        </form>
        <button className="register-login-button" onClick={props.setShowLogin}>Don't have an account? Create One.</button>
        </div>
      </div>
    )
  }
