import React from 'react';
import '../Register/Register.css';
import logo from '../../Images/BEATCAVE_WHITE_180.png';

import Login from '../Login/Login.js';
import Register from '../Register/Register.js';


async function callLogin(email, password){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  }
  var token = await fetch('https://www.beatcaveapi.com/users/login/', requestOptions)
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

async function callRegister(email, password, firstname, lastname, artistname, phonenumber, birthdate){
  const requestOptions = {
    method: 'POST',
    headers: 
    { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email: email, 
      password: password, 
      firstname: firstname, 
      lastname: lastname, 
      artistname: artistname, 
      phonenumber: phonenumber, 
      birthdate: birthdate
    })
  }

  var token = await fetch('https://www.beatcaveapi.com/users/register/', requestOptions)
        .then(response => response.json())
        .then(data => {
          //console.log(data.elements);
          return data.elements;
        })
        .catch(
          error => {
            console.log(error)
          }
        )
    return token;
}

export default class Authentication extends React.Component{
  constructor(props) {
    super();
    this.state = {
      firstname: "",
      lastname: "", 
      email: "",
      password: "",
      confirmpassword: "",
      artistname: "",
      phonenumber: "",
      loginErrors: "",
      showLogin: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setShowLogin = this.setShowLogin.bind(this);
  }

  setShowLogin(){
    this.setState(
      prevState => ({showLogin: !prevState.showLogin})
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    //console.log(event.target.value);
  }

  async login(){
    const { email, password } = this.state;
    var token = await callLogin(email, password);
    //console.log(token);
    if(token !== "User Doesn't Exist"){
        sessionStorage.setItem('token', JSON.stringify(token));
        this.props.setLoginStatus();
    }
  }

  async register(){
    const { email, password, confirmpassword, firstname, lastname, artistname, phonenumber, birthdate} = this.state;

    if(password === confirmpassword){
      var token = await callRegister(email, password, firstname, lastname, artistname, phonenumber, birthdate);
      if(token !== "User Doesn't Exist"){
        sessionStorage.setItem('token', JSON.stringify(token));
        this.props.setLoginStatus();
      }
    }else{
      console.log("Passwords do not match!")
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.showLogin === true){
      this.login();
    }else{
      this.register();
    }
  }

  render(){
    const { email, password, confirmpassword, firstname, lastname, artistname, phonenumber, birthdate} = this.state;
    if(this.state.showLogin === true){
      return(
        <Login
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        setShowLogin={this.setShowLogin}
        email={email}
        password={password}
        />
      )
    }else{
      return(
        <Register
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        setShowLogin={this.setShowLogin}
        email={email}
        password={password}
        confirmpassword={confirmpassword}
        firstname={firstname}
        lastname={lastname}
        artistname={artistname}
        phonenumber={phonenumber}
        birthdate={birthdate}
        />
      )
    }
  }
}