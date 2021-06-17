import axios from 'axios';
import React, {Component} from 'react';
import '../Register/Register.css'

export default class Register extends Component{

  handleSubmit = e => {
    e.preventDefault();
    console.log("works")
    const data = {
      firstName: this.firstName, 
      lastName: this.lastName,
      email: this.email,
      address: this.address, 
      phone: this.phone, 
      birthDate: this.birthDate, 
      password: this.password, 
      confirmPassword: this.password
    }
    axios.post('http://localhost:8000/register', data).then(
      response =>{
        console.log(response)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  render(){
    return(
      <div className="register-wrapper">
        <form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
          <div>
            <input type="text" placeholder="First Name" onChange={e => this.firstName = e.target.value}/>
            <input type="text" placeholder="Last Name" onChange={e => this.lastName = e.target.value}/>
            <br/>
            <input type="text" placeholder="Email" onChange={e => this.email = e.target.value}/>
            <input type="text" placeholder="Address" onChange={e => this.address = e.target.value}/>
            <br/>
            <input type="text" placeholder="Phone" onChange={e => this.phone = e.target.value}/>
            <input type="date" onChange={e => this.birthDate = e.target.value}/>
            <br/>
            <input type="password" placeholder="Password" onChange={e => this.password = e.target.value}/>
            <input type="password" placeholder="Confirm Password" onChange={e => this.confirmPassword = e.target.value}/>
            <br/>
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}