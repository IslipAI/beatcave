import React from 'react';
import '../Register/Register.css';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

/**
 * Function calls login endpoint
 * to retrive JWT token.
 * @param {*} email - users email
 * @param {*} password users password
 * @returns JWT token
 */
async function callLogin(email, password){

  //POST request options
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  }

  //fetch token
  var token = await fetch('https://www.beatcaveapi.com/users/login/', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data.elements)
        return data.elements;
      })
      .catch(error => {
          //console.log(error)
          return "User Doesn't Exist"
        }
      );
      
  //return token
  return token;
}

/**
 * Function calls register endpoint to
 * create a new user.
 * @param {*} email - users email
 * @param {*} password - users password
 * @param {*} firstname - users firstname
 * @param {*} lastname - users lastname 
 * @param {*} artistname - users artistname 
 * @param {*} phonenumber - users phonenumber
 * @param {*} birthdate - users birthdate
 * @returns user's JWT token
 */
async function callRegister(email, password, firstname, 
  lastname, artistname, phonenumber, birthdate){

  //POST request options  
  const requestoptions = {
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

  //fetch token 
  var token = await fetch('http://www.beatcaveapi.com/users/register/', requestoptions)
    .then(response => response.json())
    .then(data => {
      //console.log(data.elements);
      return data.elements;
    })
    .catch(
      error => {
        console.log(error)
        return "User Doesn't Exist"
      }
    )

    //return token
    return token;
}

function showInvalidPopup() {
  document.getElementById("popup").style.visibility = "visible";
  setTimeout(hideInvalidPopup, 3000);
}

function hideInvalidPopup() {
  document.getElementById("popup").style.visibility = "hidden";
}



/**
 * Authentication Component.
 */
export default class Authentication extends React.Component{
  constructor(props) {
    super();
    this.state = {
      firstname: "",       //users firstname
      lastname: "",        //users lastname
      email: "",           //users email
      password: "",        //users password
      confirmpassword: "", //password confirmation
      artistname: "",      //artistname
      phonenumber: "",     //phonenumber
      birthdate: "",
      loginErrors: "",     //login errors placeholder
      showLogin: true,     //form switch
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setShowLogin = this.setShowLogin.bind(this);
  }

  /**
   * Sets which form to be displayed to the user.
   */
  setShowLogin(){
    this.setState(
      prevState => ({showLogin: !prevState.showLogin})
    );
  }

  /**
   * Function handles change of user input.
   * @param {*} event - user input change. 
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    //console.log(event.target.value);
  }

  /**
   * Function sets the token if valid token.
   * Sets the users status to logged in.
   */
  async login(){
    const { email, password } = this.state;
    var token = await callLogin(email, password);
    //console.log(token);
    if(token !== "User Doesn't Exist"){
        sessionStorage.setItem('token', JSON.stringify(token));
        this.props.setLoginStatus();
    }else{
      showInvalidPopup();
    }
  }

  /**
   * Function sets the token if valid.
   * Sets the users status to logged in.
   */
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

  /**
   * Handles which function to 
   * call on authentication.
   * @param {*} e 
   */
  handleSubmit(e){
    e.preventDefault();
    if(this.state.showLogin === true){
      this.login();
    }else{
      this.register();
    }
  }

  /**
   * Function renders components view.
   * @returns rendered Authenticaton view.
   */
  render(){

    const { email, password, confirmpassword, firstname, lastname, 
      artistname, phonenumber, birthdate} = this.state;

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