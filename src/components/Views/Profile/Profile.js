import React, { Component } from 'react';


function UserDisplay(props){
    return(
        <div>
            <h1>Profile</h1>
            <input type="text" defaultValue={props.email}/>
             <br/>
             <input type="text" defaultValue={props.firstname}/>
             <br/>
             <input type="text" defaultValue={props.lastname}/>
             <br/>
             <input type="text" defaultValue={props.artistname}/>
             <br/>
             <input type="text" defaultValue={props.phonenumber}/>
             <br/>
             <input type="text" defaultValue={props.birthdate.split('T')[0]}/>
        </div>
    )
}

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstname: "",
          lastname: "", 
          email: "",
          artistname: "",
          phonenumber: "",
          birthdate: ""
        };
      }

    //Calls API to get user data by id
    async getUser(id){
        await fetch("http://localhost:8000/users/user/" + id.toString() + "/")
        .then(response => {
            return response.json()
        })
        .then(data => {
            //console.log(data.elements[0])
            this.setState({
                email: data.elements[0].email,
                firstname: data.elements[0].firstname,
                lastname: data.elements[0].lastname,
                artistname: data.elements[0].artistname,
                phonenumber: data.elements[0].phonenumber,
                birthdate: data.elements[0].birthdate
            })
            return data;
          }).catch(
            error => {
              console.log(error)
            }
          )
    }


    //Returns stored user id.
    getUserId(){
        const storedToken = localStorage.getItem('token');
        if(storedToken != null){
            var tokenBody = storedToken.split('.')[1];
            //console.log(tokenBody);
            var tokenBodyDecoded = Buffer.from(tokenBody, 'base64').toString();
            //console.log(tokenBodyDecoded);
            const tokenBodyJson = JSON.parse(tokenBodyDecoded);
            return tokenBodyJson.sub;
        }
    }

    componentDidMount(){
        var id = this.getUserId();
        console.log(id)
        this.getUser(id);
    }

    render() {
        var email = this.state.email;
        var firstname = this.state.firstname;
        var lastname = this.state.lastname;
        var artistname = this.state.artistname;
        var phonenumber = this.state.phonenumber;
        var birthdate = this.state.birthdate;

        return (
            <UserDisplay 
            email={email}
            firstname={firstname}
            lastname={lastname}
            artistname={artistname}
            phonenumber={phonenumber}
            birthdate={birthdate}
            />
        )
    }
}