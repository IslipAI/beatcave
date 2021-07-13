import React, {useState} from 'react';
import axios from 'axios';
import '../Login/Login.css';
import logo from '../../Images/BEATCAVE_WHITE_180.png';

async function LoginUser(email, password){
  const urlToFetch = 'http://www.beatcaveapi.com/users/login/'.concat(email, '/', password);
    return await axios.get(urlToFetch).then(
      response =>{
          console.log(response.data.elements.toString());
          var token = response.data.elements;
          return token;
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
}

export default function Login({setToken}){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    var token = await LoginUser(email, password);
    //console.log(token);
    if(token != null){
      setToken(token)
    }
  }
    return(
      <div className="login-wrapper">
         <img src={logo} className="logo-login-register" alt="Beatcave Logo"/>
        <div className="login-form-wrapper">
        <form onSubmit={handleSubmit}>
          <h3 className="login-text">Log In</h3>
          <div>
            <input className="login-email-input" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <br/>
            <input className="login-password-input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} autoComplete="on"/>
            <br/>
            <button className="login-button">Log In</button>
          </div>
        </form>
        <button className="login-register-button">Don't have an account? Create One.</button>
        </div>
      </div>
    )
  }
