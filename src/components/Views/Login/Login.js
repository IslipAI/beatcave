import React, {useState} from 'react';
import '../Login/Login.css';
import logo from '../../Images/BEATCAVE_WHITE_180.png';


async function callLogin(email, password){

  const requestOptions = {
    method: 'POST',
    headers: 
    { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  }

  var token = await fetch('http://localhost:8000/users/login/', requestOptions)
        .then(response => response.json())
        .then(data => {
          //console.log(data.elements)
          return data.elements;
        })
        .catch(
          error => {
            console.log(error)
          }
        )
  return token;

}

export default function Login({setLogin, setToken}){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    var token = await callLogin(email, password);
    //console.log(token);
    if(token !== "User Doesn't Exist"){
      setToken(token);
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
        <button className="register-login-button" onClick={() => setLogin(true)}>Don't have an account? Create One.</button>
        </div>
      </div>
    )
  }

