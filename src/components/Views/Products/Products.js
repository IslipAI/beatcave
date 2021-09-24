import React, {Component} from 'react';


function BeatUploadForm(){

    return(
        <div>
            <h1>Selling On The Cave?</h1>
            <form>
            <select id="Genre" name="Genre">
                <option value="volvo">Rap</option>
                <option value="saab">House</option>
                <option value="fiat">Dubstep</option>
                <option value="audi">Trance</option>
            </select>
            <br/>
            <select id="Key" name="Key">
                <option value="volvo">C</option>
                <option value="saab">D</option>
                <option value="fiat">E</option>
                <option value="audi">F</option>
            </select>
            <br/>
            <input type="number" id="bpm" name="bpm" min="0" max="1000"/>
            <br/>
            <input type="text"/>
            <br/>
            <textarea id="w3review" name="w3review" rows="5" cols="30"/>
            <br/>
            <button>Choose File</button>
            <br/>
            <button>Submit</button>
            </form>
        </div>
    )
}

function ProductsDisplay(){

    return(
        <h1>hello</h1>
    )
}

export default class Products extends Component{
    render(){
        return(
            <div>
                <h1>Products</h1>
                <BeatUploadForm/>
            </div>
        )
    }
}