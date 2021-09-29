import React, {Component} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../Beats/Beats.css';
import profilepicture from '../../Images/blank-profile-picture.png';

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

export default class Beats extends Component{
  constructor(props){
    super(props);
    this.state = {
        error: null, 
        isLoaded: false, 
        beats: []
    };
  }

  async fetchAPI(){
    await fetch('https://www.beatcaveapi.com/beats')
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
                isLoaded : true,
                beats: result.elements
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

  componentDidMount() {
    this.fetchAPI();
  }

  RenderBeats = (beats) => {
    return beats.map((soundObj, index) =>{
      return(
        <div className="beat-wrapper"  key={index}>
          <div className="beat-content-wrapper">
            <img src={profilepicture} className="beats-profile-picture" alt="Beatseller"/>
          </div>

          <div className="beat-player-wrapper">
          <AudioPlayer
          className="beats-audio-player"
            key={index}
            src={soundObj.mp3path}
            onPlay={e => console.log("onPlay")}/>
          </div>
        </div>
      )
    })
  }

  render(){
    const {beats} = this.state;
    return(
      <div className="beats-wrapper">
        <div className="beats-left-wrapper">
          <Filters/>
        </div>
        <div className="beats-right-wrapper">
          <div className="beats-container">
            <ul>
              <h1 className="beats-title">Welcome to BeatCave</h1>
              {this.RenderBeats(beats)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}