import React, {Component} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../Beats/Beats.css';
import {ReactComponent as AddCart} from '../../Icons/add_shopping_cart_black_24dp.svg';


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
 * Beats view component.
 */
export default class Beats extends Component{
  constructor(props){
    super(props);
    this.state = {
        error: null, 
        isLoaded: false, 
        beats: [], 
        isPlaying: false,
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
        beats: [],
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


  /**
   * Function renders list of beats.
   * @param {*} beats - collection of beats.
   * @returns list of beats.
   */
  RenderBeats = (beats) => {
    //console.log(beats)
    return beats.map((soundObj, index) =>{
      return(
        <div className="beat-wrapper"  key={index}>
          <div className="beat-content-wrapper">
            <img src={soundObj.profilepicturepath} className="beats-profile-picture" alt="Beatseller"/>
            <p>{soundObj.name} - {soundObj.artistname}</p>
            <p>{soundObj.beatkey} ${soundObj.price}</p>
            <p>{soundObj.description}</p>
            <AddCart className="add-cart-beats" onClick={() => AddToCart(soundObj.id)}/>
          </div>
          <div className="beat-player-wrapper">
            <AudioPlayer
              id = {1}
              className="beats-audio-player"
              key={index}
              src={soundObj.mp3path}
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
            <ul>
              <h1 className="beats-title">Welcome to BeatCave</h1>
              {this.RenderBeats(beats)}
            </ul>
      </div>
    )
  }
}



