import React, {useState} from 'react';
import PropTypes from 'prop-types';

import '../Login/Login.css'


async function loginUser(email, password) {
  console.log('http://www.beatcaveapi.com/login/'.concat(email,'/', password))
  const token = await fetch('http://www.beatcaveapi.com/login/'.concat(email,'/', password))
  .then(response => {
    return response.json();
  }).then(token =>{
    console.log(token)
    return token;
  });

  return token;

  //console.log(fetchPromise)
 }

export default function Login({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    const count = 0;
    e.preventDefault();
    const token = await loginUser(
      email,
      password, 
    );
    if(token.length == 1){
      setToken(token);
    }
  }


  return(
    <div className="login-wrapper">
        <h3>Please Log In</h3>
        <form onSubmit={handleSubmit}>
        <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
            <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}