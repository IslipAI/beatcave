import React, {Component} from 'react';


function BeatUploadForm(){
    return(
        <div>
            <h1>Selling On The Cave?</h1>
            <form>
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

function UploadedBeatsDisplay(props){
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
            error: null, 
            isLoaded: false, 
            products: []
        };
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


    componentDidMount(){
        var id = this.getUserId();
        this.fetchAPI(id)
    }

    
    render(){
        return(
            <div>
                <h1>Products</h1>
                <BeatUploadForm/>
                <UploadedBeatsDisplay products={this.state.products}/>
            </div>
        )
    }
}