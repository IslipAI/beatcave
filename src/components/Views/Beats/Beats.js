import React, {Component, useState} from 'react';
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

function Beat(props){
  //console.log(props.data);
  const {id, beatkey, name, profilepicturepath, description, mp3path} = props.data;
  return(
    <div className="beat-wrapper">
          <div className="beat-content-wrapper">
            <img src={profilepicturepath} className="beats-profile-picture" alt="Beatseller"/>
            <p>{name}</p>
            <p>{beatkey}</p>
            <p>{description}</p>
            <AddCart className="add-cart-beats" onClick={() => AddToCart(id)}/>
          </div>
          <div className="beat-player-wrapper">
            <AudioPlayer
              id="player"
              className="beats-audio-player"
              src={mp3path}
              onPlay={e => console.log(e)}
              preload='metadata'
            />
          </div>
        </div>
  )
}


