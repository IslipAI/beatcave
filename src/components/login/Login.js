import React, {useState} from 'react';
import axios from 'axios';
import '../Login/Login.css';
import PropTypes from 'prop-types';

async function loginUser(email, password){
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

export default function Login({setToken}){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(email, password)
    console.log(token)
    setToken(token)
  }
    return(
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <h3>Log In</h3>
          <div>
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <br/>
            <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button>Log In</button>
          </div>
        </form>
      </div>
    )
  }

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }