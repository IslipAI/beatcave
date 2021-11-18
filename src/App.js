import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

//Import Views
import './App.css';
import Home from './components/Views/Home/Home.js';
import Beats from './components/Views/Beats/Beats.js';
import Events from './components/Views/Events/Events.js';
import About from './components/Views/About/About.js';
import Profile from './components/Views/Profile/Profile.js';
import Products from './components/Views/Products/Products.js';
import Purchases from './components/Views/Purchases/Purchases.js';
import Admin from './components/Views/Admin/Admin.js';
import Cart from './components/Views/Cart/Cart.js';
import Authentication from './components/Views/Authentication/Authentication.js';
import Signout from './components/Views/Signout/Signout';
import Navbar from './components/Navbar/Navbar.js';
import Payment from './components/Views/Payment/Payment.js'

/**
 * Applications root component.
 */
export default class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      token: ""
    }

    this.setLoginStatus = this.setLoginStatus.bind(this);
  }


  setLoginStatus(){
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  checkLoginStatus(){
    const storedToken = sessionStorage.getItem('token');
    //console.log(storedToken)
    if(storedToken != null){
      this.setState({
        loggedInStatus : "LOGGED_IN"
      })
    }else{
      this.setState({
        loggedInStatus : "NOT_LOGGED_IN"
      })
    }
  }

  componentDidMount(){
    this.checkLoginStatus();
  }


  render(){
    if(this.state.loggedInStatus === "NOT_LOGGED_IN"){
      return(
        <Authentication   
        setLoginStatus={this.setLoginStatus} 
        />
      )
    }else{
      return (
        <div className="wrapper" id="wrapper">
          <BrowserRouter>
            <Navbar/>
            <div id="page-wrap" className="page-wrap">
              <Switch>
              <Route
                exact path="/"
                render={() => {
                    return (
                      <Redirect to="/home" />
                    )
                  }}
                />
                <Route path="/home">
                  <Home/>
                </Route>
                <Route path="/beats">
                  <Beats/>
                </Route>
                <Route path="/events">
                  <Events/>
                </Route>
                <Route path="/about">
                  <About/>
                </Route>
                <Route path="/profile">
                  <Profile/>
                </Route>
                <Route path="/products">
                  <Products/>
                </Route>
                <Route path="/purchases">
                  <Purchases/>
                </Route>
                <Route path="/cart">
                  <Cart/>
                </Route>
                <Route path="/admin">
                  <Admin/>
                </Route>
                <Route path="/signout">
                  <Signout/>
                </Route>
                <Route path="/payment">
                  <Payment/>
                </Route>
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      );
    }
  }
}
