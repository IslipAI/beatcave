import axios from 'axios';
import React, {useState} from 'react';
import '../Register/Register.css'
import logo from '../Images/BEATCAVE_WHITE_180.png';

async function RegisterUser(email, password){
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

export default function Register({setToken, setLogin}){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await RegisterUser(email, password)
    console.log(token)
    if(token != null){
      setToken(token)
    }
  }

    return(
      <div className="register-wrapper">
        <img src={logo} className="logo-login-register"/>
        <div className="register-form-wrapper">
          <form onSubmit={handleSubmit}>
            <h3 className="register-text">Sign Up</h3>
            <div>
              <input type="text" className="register-firstname-input" placeholder="First Name" onChange={e => this.firstName = e.target.value}/>
              <input type="text" className="register-lastname-input" placeholder="Last Name" onChange={e => this.lastName = e.target.value}/>
              <br/>
              <input type="text" className="register-email-input" placeholder="Email" onChange={e => this.email = e.target.value}/>
              <input type="text" className="register-address-input" placeholder="Address" onChange={e => this.address = e.target.value}/>
              <br/>
              <input type="text" className="register-phone-input" placeholder="Phone" onChange={e => this.phone = e.target.value}/>
              <input type="date" className="register-birthdate-input" onChange={e => this.birthDate = e.target.value}/>
              <br/>
              <input type="password" className="register-password-input" placeholder="Password" onChange={e => this.password = e.target.value}/>
              <input type="password" className="register-confirmpassword-input" placeholder="Confirm Password" onChange={e => this.confirmPassword = e.target.value}/>
              <br/>
              <button className="register-button">Sign Up</button>
            </div>
          </form>
          <a className="login-register-link" onClick={() => setLogin(true)}>Already have an account? Log in.</a>
        </div>
      </div>
    )
}