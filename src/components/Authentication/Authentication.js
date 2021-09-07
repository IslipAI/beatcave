import React, {useState} from 'react';
import Login from '../Views/Login/Login.js';
import Register from '../Views/Register/Register.js';

export default function Authentication({setToken}){

      var [login, setLogin] = useState(true);
  
      if(login){
          return(
              <Login setLogin={setLogin} setToken={setToken}/>
          )
      }else{
        return(
            <Register setLogin={setLogin}/>
        )
      }
}