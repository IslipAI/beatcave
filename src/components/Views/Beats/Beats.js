import React, {Component} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../Beats/Beats.css';
import {ReactComponent as AddCart} from '../../Icons/add_shopping_cart_black_24dp.svg';

function GenreFilter(){
  return(
    <div className="genre-filter-wrapper">
      <select name="genre" id="genre" className="genre-filter" defaultValue={'DEFAULT'} >
        <option value="DEFAULT" disabled>Genre</option>
        <option value="volvo">Hip Hop</option>
        <option value="saab">Trap</option>
        <option value="audi">Future Bass</option>
        <option value="volvo">Techno</option>
        <option value="saab">House</option>
        <option value="audi">UK Garage</option>
        <option value="audi">Progressive House</option>
        <option value="audi">Hardstyle</option>
      </select>
    </div>
  )
}

function DownloadsFilter(){
  return(
    <div className="downloads-filter-wrapper">
      <select name="cars" id="cars" className="downloads-filter" defaultValue={'DEFAULT'} >
        <option value="DEFAULT" disabled>Downloads</option>
        <option value="volvo">High to Low</option>
        <option value="saab">Low to High</option>
      </select>
    </div>
  )
}

function PriceFilter(){
  return(
    <div className="price-filter-wrapper">
      <select name="genre" id="genre" className="price-filter" defaultValue={'DEFAULT'} >
        <option value="DEFAULT" disabled>Price</option>
        <option value="volvo">High to Low</option>
        <option value="saab">Low to High</option>
      </select>
    </div>
  )
}

function BpmFilter(){
  return(
    <div className="bpm-filter-wrapper">
      <input className="bpm-filter" type="range" min="1" max="200" id="myRange"/>
    </div>
  )
}

function KeyFilter(){
  return(
    <div className="key-filter-wrapper">
      <select name="cars" id="cars" className="key-filter" defaultValue={"DEFAULT"} >
        <option value="DEFAULT" disabled>Key</option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  )
}

function Filters(){
  return(
    <ul className="filter-list">
      <input type="text"/>
      <GenreFilter/>
      <DownloadsFilter/>
      <PriceFilter/>
      <BpmFilter/>
      <KeyFilter/>
      <button className="filter-button">Search</button>
    </ul>
  )
}

/**
 * Function adds a beat Id 
 * to the cart to checkout later.
 * @param {*} id - beat Id
 */
function AddToCart(id){
  try{
    var beatsCart = sessionStorage.getItem('beatsCart');
    if(beatsCart == null){
      sessionStorage.setItem('beatsCart', id)
    }else{
      beatsCart = sessionStorage.getItem('beatsCart');

      beatsCart = beatsCart + ',' + id;
      sessionStorage.setItem('beatsCart', beatsCart)
    }
    //console.log(beatsCart);
  }catch(error){
    console.log(error)
  }
}

/**
 * Beats class.
 */
export default class Beats extends Component{
  constructor(props){
    super(props);
    this.state = {
        error: null, 
        isLoaded: false, 
        beats: []
    };
  }

  /**
   * Function calls a GET request to beats endpoint
   * to retrive data about beats.
   */
  async fetchBeatsAPI(){
    await fetch('https://www.beatcaveapi.com/beats')
    .then(res => res.json())
    .then((result) => {
      this.setState({
          isLoaded : true,
          beats: result.elements
      });
      //console.log(result.elements);
    })
    .catch((error) =>{
      this.setState({
        isLoaded: true, 
        error
      });
    });
  }

  /**
   * Calls the beat API before render.
   */
  componentDidMount() {
    this.fetchBeatsAPI();
  }


  RenderBeats = (beats) => {
    console.log(beats)
    return beats.map((soundObj, index) =>{
      return(
        <div className="beat-wrapper"  key={index}>
          <div className="beat-content-wrapper">
            <img src={soundObj.profilepicturepath} className="beats-profile-picture" alt="Beatseller"/>
            <p>{soundObj.name}</p>
            <p>{soundObj.beatkey}</p>
            <p>{soundObj.description}</p>
            <AddCart className="add-cart-beats" onClick={() => AddToCart(soundObj.id)}/>
          </div>
          <div className="beat-player-wrapper">
            <AudioPlayer
              className="beats-audio-player"
              key={index}
              src={soundObj.mp3path}
              onPlay={e => console.log("onPlay")}
            />
          </div>
        </div>
      )
    })
  }

  /**
   * Beat Class render method.
   * @returns Beats View.
   */
  render(){
    const {beats} = this.state;
    return(
      <div className="beats-wrapper">
        <div className="beats-left-wrapper">
        </div>
        <div className="beats-right-wrapper">
            <ul>
              <h1 className="beats-title">Welcome to BeatCave</h1>
              {this.RenderBeats(beats)}
            </ul>
        </div>
      </div>
    )
  }
}