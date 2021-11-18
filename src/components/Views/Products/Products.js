import React, {Component, useState} from 'react';
import {uploadFile} from 'react-s3';
import Popup from 'reactjs-popup';
import '../Products/Products.css';
import {ReactComponent as DeleteProduct} from '../../Icons/delete_black_24dp.svg';
import {ReactComponent as EditProduct} from '../../Icons/edit_black_24dp.svg';


/**
 * Function calls event endpoint to upload event.
 * @param {*} name - name of event
 * @param {*} totaltickets - number of tickets
 * @param {*} venuename  - venue name
 * @param {*} venueaddress - venue address
 * @param {*} city - city of event 
 * @param {*} price - price of event
 * @param {*} description - description of event
 * @param {*} date - date of event
 * @param {*} starttime - start time of event
 * @param {*} endtime - end time of event
 */
async function PostEvent(name, totaltickets, venuename, venueaddress, 
    city, price, description, date, starttime, endtime){
    //console.log("EVENT POST REQUEST!")
    
    const requestOptions = {
      method: 'POST',
      headers: 
      { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          name: name,
          totaltickets: totaltickets, 
          venue: venuename,
          venueaddress: venueaddress,
          city: city,
          price: price,
          description: description, 
          date: date,
          starttime: starttime,
          endtime:endtime
      })
    }

    await fetch('https://www.beatcaveapi.com/events/addevent/', requestOptions)
        .then(response => console.log(response))
        .then(window.location.reload(false))
        .catch(error => {
            console.log(error)
          }
        )
}

/**
 * Function calls POST beat endpoint.
 * @param {*} id - userid
 * @param {*} productname - the beats name
 * @param {*} beatkey - the beat key
 * @param {*} genre - the beats genre
 * @param {*} bpm - the beats bpm
 * @param {*} description - the beats description
 * @param {*} mp3path - the mp3 path of the beat in aws bucket.
 * @param {*} price - the price of the beat
 */
async function PostBeat(id, productname, beatkey, genre, 
    bpm, description, mp3path, price){
    console.log("BEAT POST REQUEST!")
    console.log(mp3path);
    const requestOptions = {
        method: 'POST',
        headers: 
        { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            ownerid: id,
            name: productname,
            beatkey: beatkey, 
            genre: genre,
            bpm: bpm,
            description: description,
            mp3path: mp3path,
            price: price,
        })
      }

      await fetch('https://www.beatcaveapi.com/beats/addbeat/', requestOptions)
      .then(response => console.log(response))
      .then(window.location.reload(false))
      .catch(
        error => {
          console.log(error)
        }
      );

}

/**
 * Function calls API to delete beat.
 * @param {*} id - beat id
 */
async function DeleteBeat(id){
    const requestOptions = {
        method: 'DELETE',
        headers: 
        { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: id,
        })
      }

      await fetch('http://www.beatcaveapi.com/beats/deletebeat/', requestOptions)
      .then(response => console.log(response))
      .then(window.setTimeout(window.location.reload(false), 500))
      .catch(error => {
          console.log(error)
        }
      )
    //console.log(id);
}

async function UpdateBeat(id, name, description){
    console.log(name);
    const requestOptions = {
        method: 'PUT',
        headers: 
        { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: id,
            name: name, 
            description: description,
        })
      }

      await fetch('http://localhost:8000/beats/updatebeat/', requestOptions)
      .then(response => console.log(response))
      .then(window.setTimeout(window.location.reload(false), 500))
      .catch(error => {
          console.log(error)
        }
      )
}

/**
 * Initializes beat upload form.
 * @param {*} props 
 * @returns Beat upload form.
 */
function BeatUploadForm(props){

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    return(
        <div className="formcontainer">
            <form className='beatform'>
            <select id="Genre" name="genre" onChange={props.handleChange}>
                <option value="Rap">Rap</option>
                <option value="House">House</option>
                <option value="Dubstep">Dubstep</option>
                <option value="Trance">Trance</option>
                <option value="Garage">Garage</option>
            </select>
            <br/>
            <select id="Key" name="key" onChange={props.handleChange}>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="A">A</option>
                <option value="B">B</option>
            </select>
            <br/>
            <input 
                type="number" 
                id="Bpm" 
                name="bpm" 
                min="0" 
                max="1000" 
                placeholder="Bpm"
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="text" 
                placeholder="Name"
                name="beatname"
                onChange={props.handleChange}
                required
            />
            <br/>
            <textarea 
                id="Description" 
                name="description" 
                rows="5" 
                cols="30" 
                placeholder="Description"
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="file" 
                onChange={handleFileInput}
            />
            <br/>
            <button type="button" onClick={() => props.handleUpload(selectedFile)}>Upload Beat</button>
            </form>
        </div>
    )
}

/**
 * Initialized event upload form.
 * @param {*} props 
 * @returns event upload form.
 */
function EventUploadForm(props){
    return(
        <div>
            <form onSubmit={props.uploadProduct} className="eventform">
            <input 
                type="text" 
                name="productname"
                placeholder="Name"
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="number" 
                name="totaltickets"
                id="tickets" 
                min="0" max="1000" 
                placeholder="Tickets"
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="text" 
                name="venuename"
                placeholder="Venue Name"
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="text" 
                name="venueaddress"
                placeholder="Venue Address"
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="text" 
                name="city"
                placeholder="City"
                onChange={props.handleChange}
                required
            />
            <br/>
            <textarea 
                id="description" 
                name="description" 
                rows="5" 
                cols="30" 
                placeholder="Description"
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="number" 
                name="price"
                min="1" 
                max="1000" 
                step="any"
                placeholder="Price"
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="date" 
                name="date"
                placeholder="1"
                onChange={props.handleChange}
                required
              />
            <br/>
            <select id="starttime" name="starttime" onChange={props.handleChange}>
                <option value="8AM">8AM</option>
                <option value="9AM">9AM</option>
                <option value="10AM">10AM</option>
                <option value="11AM">11AM</option>
                <option value="12AM">12PM</option>
                <option value="1PM">1PM</option>
                <option value="2PM">2PM</option>
                <option value="3PM">3PM</option>
                <option value="4PM">4PM</option>
                <option value="5PM">5PM</option>
                <option value="6PM">6PM</option>
                <option value="7PM">7PM</option>
                <option value="8PM">8PM</option>
                <option value="9PM">9PM</option>
                <option value="10PM">10PM</option>
                <option value="11PM">11PM</option>
                <option value="12AM">12AM</option>
            </select>
            <br/>
            <select id="endtime" name="endtime" onChange={props.handleChange}>
                <option value="8AM">8AM</option>
                <option value="9AM">9AM</option>
                <option value="10AM">10AM</option>
                <option value="11AM">11AM</option>
                <option value="12PM">12PM</option>
                <option value="1PM">1PM</option>
                <option value="2PM">2PM</option>
                <option value="3PM">3PM</option>
                <option value="4PM">4PM</option>
                <option value="5PM">5PM</option>
                <option value="6PM">6PM</option>
                <option value="7PM">7PM</option>
                <option value="8PM">8PM</option>
                <option value="9PM">9PM</option>
                <option value="10PM">10PM</option>
                <option value="11PM">11PM</option>
                <option value="12AM">12AM</option>
            </select>
            <br/>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

/**
 * Decides what form to output to user.
 * @param {*} props 
 * @returns forms 
 */
function UploadForm(props){
    if(props.showForm === "beats"){
        return(
            <BeatUploadForm 
                handleUpload={props.handleUpload} 
                handleChange={props.handleChange} 
                uploadProduct={props.uploadProduct}
            />
        )
    }else{
        return(
            <EventUploadForm 
                handleChange={props.handleChange} 
                uploadProduct={props.uploadProduct}
            />
        )
    }
}

/**
 * Creates products container with each products
 * information. 
 * information.
 * @param {*} props 
 * @returns Product display.
 */
function UploadedProductsDisplay(props){
    //console.log(props.products[0])
    return props.products.map((products, index) =>{
        return(
          <div className="product-container"  key={index}>
              <p>{props.products[index].name}</p>
              <p>{props.products[index].genre}</p>
              <p>KEY:{props.products[index].beatkey} &nbsp;&nbsp; BPM:{props.products[index].bpm}</p>
              <Popup trigger={<DeleteProduct className="deleteicon"/>} modal>
                {close => (
                <div className="product-popup">
            
                    <div className="header">
                        <p>Are you sure you want to delete '{props.products[index].name}'?</p>
                    </div>
                    <div className="content">
                        
                    </div>
                    <div className="actions">
                        <button className="button" onClick={() => {DeleteBeat(props.products[index].id); close();}}>Yes</button>
                        <button className="button" onClick={() => {console.log("modal closed "); close();}}>No</button>
                    </div>
                </div>
                )}
            </Popup>
              <Popup trigger={<EditProduct className="editicon"/>} modal>
                {close => (
                <div className="product-popup">
            
                    <div className="header"><p>Editing '{props.products[index].name}'!</p></div>
                    <div className="content">
                    <input 
                        id="newname"
                        type="text" 
                        name="beatname"
                        defaultValue={props.products[index].name}
                        required
                    />
                    <textarea 
                        id="newdescription" 
                        name="description" 
                        rows="5" 
                        cols="30" 
                        defaultValue={props.products[index].name}
                        required
                    />
                    </div>
                    <div className="actions">
                        <button className="button" onClick={() => {
                            UpdateBeat(
                            props.products[index].id,
                            document.getElementById("newname").value, 
                            document.getElementById("newdescription").value); 
                            close();}}>
                            Submit
                        </button>
                        <button className="button" onClick={() => {console.log("modal closed "); close();}}>Close</button>
                    </div>
                </div>
                )}
            </Popup>
          </div>
        )
      })
}

/**
 * Products Component
 */
export default class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            userid: null,
            products: [], 
            admin: false,
            showForm: "beats",
            productname: "", 
            beatname: "",
            totaltickets: 0,
            venuename: "", 
            venueaddress: "", 
            city: "",
            description: "", 
            price: 0,
            date: null, 
            starttime: null,
            endtime: null,
            key: "C",
            genre: 'Rap',
            bpm: 0,
            bucket: '',
            directory: '',
            region: '',
            access: '',
            secret: '',
            error: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadProduct = this.uploadProduct.bind(this);
    }
    

    /**
     * Calls user endpoint by id 
     * to get user data.
     * @param {*} id - users data
     */
    async fetchAPI(id){
        await fetch("https://www.beatcaveapi.com/users/user/products/" + id.toString() + "/")
        .then(response => {
            return response.json()
        })
        .then((result) => {
                this.setState({
                    isLoaded : true,
                    products: result.elements
                });
                //console.log(result.elements);
            },(error) =>{
                this.setState({
                    isLoaded: true, 
                    error
                });
            }
        )

        await fetch('https://www.beatcaveapi.com/users/user/aws/access', {mode: 'cors'},)
        .then((response) => {
            return response.json();
        })
        .then((result)=>{
            //console.log(result);
            this.setState({
                bucket: result.elements[0].bucketname,
                directory: result.elements[0].directory,
                region: result.elements[0].region,
                access: result.elements[0].access,
                secret: result.elements[0].private,
            });
            //console.log(this.state.directory);
        })
    }


    /**
     * Gets user id from the JWT token.
     * @returns JWT token
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
     * Method checks if you have admin privledges.
     */
    checkAdmin(){
        const storedToken = sessionStorage.getItem('token');
        if(storedToken != null){
            var tokenBody = storedToken.split('.')[1];
            //console.log(tokenBody);

            var tokenBodyDecoded = Buffer.from(tokenBody, 'base64').toString();
            //console.log(tokenBodyDecoded);

            const tokenBodyJson = JSON.parse(tokenBodyDecoded);
            //console.log(tokenBodyJson.admin);

            if(tokenBodyJson.admin === "A"){
                this.setState({
                    admin: true
                });
            }else{
                this.setState({
                    admin: false
                });
            }
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
        //console.log(event.target.value);
    }


    /**
     * Function executes these methods
     * before component renders.
     */
    componentDidMount(){
        var id = this.getUserId();
        this.setState({userid: id});
        this.fetchAPI(id)
        this.checkAdmin();
    }

    /**
     * Function handles uploading 
     * @param {*} file 
     */
    handleUpload = async (file) => {
        const {userid, beatname, 
            key, genre, bpm, 
            description, price, bucket, 
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
            //console.log("File cannot be null!");
        }else{
            uploadFile(file, config)
            .then(async function(data){
                //console.log(data.location);
                await PostBeat(userid, beatname, 
                    key, genre, bpm, 
                    description, data.location.toString(), price);
            })
            .catch(err => console.error(err))
        }
      
    }

    /**
     * Decides what tAPI endpoint to call.
     * @param {*} e user event.
     */
    uploadProduct(e){
        e.preventDefault();
        const {productname, totaltickets, venuename, venueaddress, 
            city, price, description, date, starttime, endtime} = this.state;
        if(this.state.showForm === "beats"){
            //Do nothing
        }else{
            PostEvent(productname, totaltickets, venuename, venueaddress, 
                city, price, description, date, starttime, endtime);
        }

    }

    render(){
        if(this.state.admin === true){
            return(
                <div className="products-wrapper">
                    <div className="products-left-wrapper">
                        <h2>Selling On The Cave?</h2>
                        <select onChange={this.handleChange} name="showForm">
                            <option value="beats">Beats</option>
                            <option value="events">Events</option>    
                        </select>
                        <UploadForm 
                            showForm={this.state.showForm} 
                            handleChange={this.handleChange} 
                            uploadProduct={this.uploadProduct} 
                            handleUpload={this.handleUpload}
                        />  
                    </div>
                    <div className="products-right-wrapper">
                        <h2>Products</h2>
                        <UploadedProductsDisplay products={this.state.products}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="products-wrapper">
                <div className="products-left-wrapper">
                    <h2>Selling On The Cave?</h2>
                    <UploadForm 
                        showForm={this.state.showForm} 
                        handleChange={this.handleChange} 
                        uploadProduct={this.uploadProduct} 
                        handleUpload={this.handleUpload}
                    />  
                </div>
                <div className="products-right-wrapper">
                    <h2>Products</h2>
                    <UploadedProductsDisplay products={this.state.products}/>
                </div>
            </div>
            )
        }
    }
}