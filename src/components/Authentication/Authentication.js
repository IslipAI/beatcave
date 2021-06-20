import React, {useState} from 'react';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

export default function Authentication({setToken}){

      const [login, setLogin] = useState(true);
  
      if(login){
          return(
              <Login setToken={setToken} setLogin={setLogin}/>
          )
      }else{
        return(
            <Register setToken={setToken} setLogin={setLogin}/>
        )
      }
}