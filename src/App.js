import React, { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Beats from './components/Beats/Beats.js';
import Events from './components/Events/Events.js'
import Login from './components/Login/Login.js'

function App() {
  const [token, setToken] = useState();

 if(!token){
   return <Login setToken={setToken}/>
 }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/beats">
            <Beats/>
          </Route>
          <Route path="/events">
            <Events/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
