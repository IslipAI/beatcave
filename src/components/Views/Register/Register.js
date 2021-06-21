import axios from 'axios';
import React, {useState} from 'react';
import '../Register/Register.css'
import logo from '../../Images/BEATCAVE_WHITE_180.png';

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
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [artistName, setArtistName] = useState();
  const [birthdate, setBirthdate] = useState();
  const [phone, setPhone] = useState()
  

  const handleSubmit = async e => {
    e.preventDefault();

    const token = await RegisterUser(firstName, 
      lastName, email, password, 
      confirmPassword, artistName, birthdate, phone);

    console.log(token)
    if(token != null){
      setToken(token)
    }
  }

    return(
      <div className="register-wrapper">
        <img src={logo} className="logo-login-register" alt="Beatcave logo"/>
        <div className="register-form-wrapper">
          <form onSubmit={handleSubmit}>
            <h3 className="register-text">Sign Up</h3>
            <div>
              <input type="text" className="register-firstname-input" placeholder="First Name" onChange={e => setFirstName(e.target.value)}/>
              <input type="text" className="register-lastname-input" placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
              <br/>
              <input type="text" className="register-email-input" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <input type="text" className="register-address-input" placeholder="Address" onChange={e => setArtistName(e.target.value)}/>
              <br/>
              <input type="text" className="register-phone-input" placeholder="Phone" onChange={e => setPhone(e.target.value)}/>
              <input type="date" className="register-birthdate-input" onChange={e => setBirthdate(e.target.value)}/>
              <br/>
              <input type="password" className="register-password-input" placeholder="Password" onChange={e => setPassword(e.target.value)} autoComplete="on"/>
              <input type="password" className="register-confirmpassword-input" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} autoComplete="on"/>
              <br/>
              <button className="register-button">Sign Up</button>
            </div>
          </form>
          <button className="register-login-button" onClick={() => setLogin(true)}>Already have an account? Log in.</button>
        </div>
      </div>
    )
}