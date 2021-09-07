import React, {useState} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import useToken from './components/Hooks/UseToken.js';

import './App.css';
import Home from './components/Views/Home/Home.js';
import Beats from './components/Views/Beats/Beats.js';
import Events from './components/Views/Events/Events.js';
import About from './components/Views/About/About.js';
import Profile from './components/Views/Profile/Profile.js';
import Products from './components/Views/Products/Products.js';
import Purchases from './components/Views/Purchases/Purchases.js';
import Authentication from './components/Authentication/Authentication.js';

import Navbar from './components/Navbar/Navbar.js';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Authentication setToken={setToken}/>
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar token={token}/>
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
          <Route path="/admin">
            <Purchases/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
