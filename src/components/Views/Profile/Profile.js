import React, { Component, useState } from 'react';
import '../Profile/Profile.css';
import {uploadFile} from 'react-s3';

/**
 * Function returns user data display. Allows for new 
 * profile picture selection and profile update.
 * @param {*} props 
 * @returns html user display.
 */
function UserDisplay(props){

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    //console.log(props.profilepicturepath)
    return(
        <div className="profile-display">
            <h1 className="profile-view-title">Profile</h1>
            <img className="profile-profile-picture" alt="Profile" src={props.profilepicturepath}/>
            <br/>
            <input 
                type="file" 
                onChange={handleFileInput}
                className="fileInput"
            />
            <br/>
            <input 
                type="text" 
                defaultValue={props.email} 
                disabled
            />
             <br/>
             <input 
                type="text" 
                defaultValue={props.firstname}
                name="firstname"
                onChange={props.handleChange}
             />
             <br/>
             <input 
                type="text" 
                defaultValue={props.lastname}
                name="lastname"
                onChange={props.handleChange}
             />
             <br/>
             <input 
                type="text" 
                defaultValue={props.artistname}
                name="artistname"
                onChange={props.handleChange}
             />
             <br/>
             <input 
                type="text" 
                defaultValue={props.phonenumber}
                name="phonenumber"
                onChange={props.handleChange}
             />
             <br/>
             <input 
                type="text" 
                defaultValue={props.birthdate.split('T')[0]}
                disabled
             />
             <br/>
             <button type="button" onClick={() => props.handleUpload(selectedFile)}>Save</button>
        </div>
    )
}

/**
 * Function sends put request to update user.
 * @param {*} id - users id
 * @param {*} firstname -users firstname
 * @param {*} lastname -users lastname
 * @param {*} artistname - users artistname
 * @param {*} phonenumber - users phonenumber
 * @param {*} profilepicturepath - users profile picture path
 */
async function updateUser(id, firstname, lastname, artistname, phonenumber, profilepicturepath){
    const requestOptions = {
        method: 'PUT',
        headers: 
        { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: id,
            firstname: firstname,
            lastname: lastname,
            artistname: artistname,
            phonenumber: phonenumber,
            profilepicturepath: profilepicturepath
        })
      }

      await fetch('https://www.beatcaveapi.com/users/updateuser/', requestOptions)
        .then(response => console.log(response))
        .then(setTimeout(window.location.reload(false) , 1000))
        .catch(error => {
            console.log(error)
          }
        )
}

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            firstname: "",
            lastname: "", 
            email: "",
            artistname: "",
            phonenumber: "",
            birthdate: "",
            profilepicturepath: "",
            bucket: '',
            directory: 'profilepictures',
            region: '',
            access: '',
            secret: '',
        };
        this.handleChange = this.handleChange.bind(this);
      }

    /**
     * Function gets user data.
     * @param {*} id - users id.
     */
    async fetchUser(id){
        await fetch("https://www.beatcaveapi.com/users/user/" + id.toString() + "/")
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
                birthdate: data.elements[0].birthdate,
                profilepicturepath: data.elements[0].profilepicturepath
            })
            return data;
          }).catch(
            error => {
              console.log(error)
            }
          )
    }

    /**
     * Function retrives AWS bucket data.
     */
    async fetchAWS(){
        await fetch('https://www.beatcaveapi.com/users/user/aws/access', {mode: 'cors'},)
        .then((response) => {
            return response.json();
        })
        .then((result)=>{
            //console.log(result);
            this.setState({
                bucket: result.elements[0].bucketname,
                //directory: result.elements[0].directory,
                region: result.elements[0].region,
                access: result.elements[0].access,
                secret: result.elements[0].private,
            });
            //console.log(this.state.directory);
        })
    }


    /**
     * Function gets userID from JWT
     * @returns - user id
     */
    getUserId(){
        const storedToken = sessionStorage.getItem('token');
        if(storedToken != null){
            var tokenBody = storedToken.split('.')[1];
            //console.log(tokenBody);
            var tokenBodyDecoded = Buffer.from(tokenBody, 'base64').toString();
            //console.log(tokenBodyDecoded);
            const tokenBodyJson = JSON.parse(tokenBodyDecoded);
            return tokenBodyJson.sub;
        }
    }

    /**
     * ComponentsDidMount method prepares all
     * data before render.
     */
    componentDidMount(){
        var id = this.getUserId();
        this.setState({
            id: id
        });
        //console.log(id)
        this.fetchUser(id);
        this.fetchAWS();
    }

    /**
     * Function handles file upload. If file is null, then 
     * it will only update the sql data and now aws bucket.
     * @param {*} file - users new profile picture.
     */
    handleUpload = async (file) => {
        const {id, firstname, lastname, 
            artistname, phonenumber, 
            profilepicturepath, bucket, 
            directory, region, 
            access, secret} = this.state;

        //S3 UPLOAD CONFIG.
        const config = {
            bucketName: bucket,
            dirName: directory,
            region: region,
            accessKeyId: access, 
            secretAccessKey: secret,
        }

        if(file == null){
            updateUser(id, firstname, lastname, artistname, phonenumber, profilepicturepath)
        }else{
            uploadFile(file, config)
            .then(async function(data){
                //console.log(data.location);
                updateUser(id, firstname, lastname, artistname, phonenumber, data.location)
            })
            .catch(err => console.error(err))
        }
    }

    /**
     * Changes variables value on event change.
     * @param {*} event - user changing input.
     */
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    /**
     * Components render 
     * @returns User display
     */
    render() {
        var email = this.state.email;
        var firstname = this.state.firstname;
        var lastname = this.state.lastname;
        var artistname = this.state.artistname;
        var phonenumber = this.state.phonenumber;
        var birthdate = this.state.birthdate;
        var profilepicturepath = this.state.profilepicturepath;

        return (
            <div className="profile-wrapper">
                 <UserDisplay 
                    email={email}
                    firstname={firstname}
                    lastname={lastname}
                    artistname={artistname}
                    phonenumber={phonenumber}
                    birthdate={birthdate}
                    profilepicturepath={profilepicturepath}
                    handleUpload={this.handleUpload}
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
}