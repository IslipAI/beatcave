import React, {Component} from 'react';

async function PostEvent(name, totaltickets, venuename, venueaddress, city, price, description, date, starttime, endtime){
    console.log("EVENT POST REQUEST!")
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

    await fetch('http://www.beatcaveapi.com/events/addevent/', requestOptions)
        .then(response => console.log(response))
        .catch(
          error => {
            console.log(error)
          }
        )
}
async function PostBeat(){
    console.log("BEAT POST REQUEST!")

}

function BeatUploadForm(props){
    return(
        <div>
            <form onSubmit={props.uploadProduct}>
            <select id="Genre" name="Genre">
                <option value="rap">Rap</option>
                <option value="house">House</option>
                <option value="dubstep">Dubstep</option>
                <option value="trance">Trance</option>
            </select>
            <br/>
            <select id="Key" name="Key">
                <option value="c">C</option>
                <option value="d">D</option>
                <option value="e">E</option>
                <option value="f">F</option>
            </select>
            <br/>
            <input type="number" id="Bpm" name="bpm" min="0" max="1000" placeholder="Bpm"/>
            <br/>
            <input type="text" placeholder="Name"/>
            <br/>
            <textarea id="w3review" name="w3review" rows="5" cols="30" placeholder="Description"/>
            <br/>
            <button>Choose File</button>
            <br/>
            <button>Submit</button>
            </form>
        </div>
    )
}

function EventUploadForm(props){
    return(
        <div>
            <form onSubmit={props.uploadProduct}>
            <input 
                type="text" 
                name="name"
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
                onChange={props.handleChange}
                required
            />
            <br/>
            <input 
                type="date" 
                name="birthdate"
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

function UploadForm(props){
    if(props.showForm === "beats"){
        return(
            <BeatUploadForm handleChange={props.handleChange} uploadProduct={props.uploadProduct}/>
        )
    }else{
        return(
            <EventUploadForm handleChange={props.handleChange} uploadProduct={props.uploadProduct}/>
        )
    }
}

function UploadedProductsDisplay(props){
    console.log(props.products[0])
    return props.products.map((products, index) =>{
        return(
          <div className=""  key={index}>
              <p>{props.products[index].name}</p>
              <p>{props.products[index].genre}</p>
              <p>{props.products[index].beatkey}</p>
              <p>${props.products[index].bpm}</p>
          </div>
        )
      })
}


export default class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: [], 
            admin: false,
            showForm: "beats",
            name: "", 
            totaltickets: 0,
            venuename: "", 
            venueaddress: "", 
            city: "",
            description: "", 
            price: 0,
            date: null, 
            starttime: null,
            endtime: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadProduct = this.uploadProduct.bind(this);
    }

    //Calls API to get user products by id
    async fetchAPI(id){
        await fetch("http://www.beatcaveapi.com/users/user/products/" + id.toString() + "/")
        .then(response => {
            return response.json()
        })
        .then(
            (result) => {
                this.setState({
                    isLoaded : true,
                    products: result.elements
                });
                console.log(result.elements);
    
            },
            (error) =>{
                this.setState({
                    isLoaded: true, 
                    error
                });
            }
        )
    }


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


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(event.target.value);
    }


    componentDidMount(){
        var id = this.getUserId();
        this.fetchAPI(id)
        this.checkAdmin();
    }

    uploadProduct(e){
        e.preventDefault();
        const {name, totaltickets, venuename, venueaddress, city, price, description, date, starttime, endtime} = this.state;
        if(this.state.showForm === "beats"){
            PostBeat();
        }else{
            PostEvent(name, totaltickets, venuename, venueaddress, city, price, description, date, starttime, endtime);
        }

    }

    render(){
        if(this.state.admin === true){
            return(
                <div>
                    <h1>Products</h1>
                    <h2>Selling On The Cave?</h2>
                    <select onChange={this.handleChange} name="showForm">
                        <option value="beats">Beats</option>
                        <option value="events">Events</option>    
                    </select>
                    <UploadForm showForm={this.state.showForm} handleChange={this.handleChange} uploadProduct={this.uploadProduct}/>
                    {/* <UploadedProductsDisplay products={this.state.products}/> */}
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Products</h1>
                    <h2>Selling On The Cave?</h2>
                    <UploadForm/>
                    {/* <UploadedProductsDisplay products={this.state.products}/> */}
                </div>
            )
        }
    }
}