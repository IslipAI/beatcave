import React from 'react';
import '../Login/Login.css';
import '../Register/Register.css';
import logo from '../../Images/BEATCAVE_WHITE_180.png';


async function callLogin(email, password){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  }
  var token = await fetch('http://www.beatcaveapi.com/users/login/', requestOptions)
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

  var token = await fetch('http://www.beatcaveapi.com/users/register/', requestOptions)
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
  }


  LoginView(){
    return(
      <div className="login-wrapper">
         <img src={logo} className="logo-login-register" alt="Beatcave Logo"/>
        <div className="login-form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <h3 className="login-text">Log In</h3>
          <div>
            <input 
              className="login-email-input" 
              type="text" 
              placeholder="Email" 
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <br/>
            <input 
            className="login-password-input" 
            type="password" 
            placeholder="Password" 
            name="password"
            value={this.state.password}
            onChange={this.handleChange} 
            autoComplete="on"
            required
            />
            <br/>
            <button className="login-button">Log In</button>
          </div>
        </form>
        <button className="register-login-button" onClick={() => this.setState(prevState =>({showLogin: !prevState.showLogin}))}>Don't have an account? Create One.</button>
        </div>
      </div>
    )
  }


  RegistrationView(){
    return(
      <div className="register-wrapper">
        <img src={logo} className="logo-login-register" alt="Beatcave logo"/>
        <div className="register-form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <h3 className="register-text">Sign Up</h3>
            <div>
              <input 
                type="text" 
                className="register-firstname-input" 
                placeholder="First Name" 
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleChange}
                required
              />
              <input 
                type="text" 
                className="register-lastname-input" 
                placeholder="Last Name" 
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
                required
              />
              <br/>
              <input 
                type="text" 
                className="register-email-input" 
                placeholder="Email" 
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <input type="text" 
                className="register-address-input" 
                placeholder="Artist Name"
                name="artistname"
                value={this.state.artistname}
                onChange={this.handleChange}
              />
              <br/>
              <input 
                type="text" className="register-phone-input" 
                placeholder="Phone" 
                name="phonenumber"
                value={this.state.phonenumber}
                onChange={this.handleChange}
                required
              />
              <input 
                type="date" 
                className="register-birthdate-input" 
                name="birthdate"
                value={this.state.birthdate}
                onChange={this.handleChange}
                required
              />
              <br/>
              <input 
              type="password" 
              className="register-password-input"
              placeholder="Password" 
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="on"
              required
              />
              <input 
              type="password" 
              className="register-confirmpassword-input" 
              placeholder="Confirm Password"
              name="confirmpassword"
              value={this.state.confirmpassword} 
              onChange={this.handleChange} 
              autoComplete="on"
              required
              />
              <br/>
              <button className="register-button">Sign Up</button>
            </div>
          </form>
          <button className="register-login-button" onClick={() => this.setState(prevState =>({showLogin: !prevState.showLogin}))}>Already have an account? Log in.</button>
        </div>
      </div>
    )
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
        localStorage.setItem('token', JSON.stringify(token));
        this.props.setLoginStatus();
    }
  }

  async register(){
    const { email, password, confirmpassword, firstname, lastname, artistname, phonenumber, birthdate} = this.state;

    if(password === confirmpassword){
      var token = await callRegister(email, password, firstname, lastname, artistname, phonenumber, birthdate);
      if(token !== "User Doesn't Exist"){
        localStorage.setItem('token', JSON.stringify(token));
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
    if(this.state.showLogin === true){
      return(
        this.LoginView()
      )
    }else{
      return(
        this.RegistrationView()
      )
    }
  }
}