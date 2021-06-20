import React, {useState} from 'react';
import axios from 'axios';
import '../Login/Login.css';
import logo from '../Images/BEATCAVE_WHITE_180.png';

async function LoginUser(email, password){
  const urlToFetch = 'http://www.beatcaveapi.com/login/'.concat(email, '/', password);
    return await axios.get(urlToFetch).then(
      response =>{
        if(response.data.elements.length > 0){
          return response.data.elements[0];
        }else{
          return null;
        }
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
}

export default function Login({setToken, setLogin}){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await LoginUser(email, password)
    console.log(token)
    if(token != null){
      setToken(token)
    }
  }
    return(
      <div className="login-wrapper">
         <img src={logo} className="logo-login-register"/>
        <div className="login-form-wrapper">
        <form onSubmit={handleSubmit}>
          <h3 className="login-text">Log In</h3>
          <div>
            <input className="login-email-input" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <br/>
            <input className="login-password-input" type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button className="login-button">Log In</button>
          </div>
        </form>
        <a className="login-register-link" onClick={() => setLogin(false)}>Don't have an account? Create One.</a>
        </div>
      </div>
    )
  }
