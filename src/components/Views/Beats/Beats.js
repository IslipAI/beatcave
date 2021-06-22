import React, {Component} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../Beats/Beats.css';

function GenreFilter(){
  return(
    <div className="genre-filter-wrapper">
      <select name="genre" id="genre" className="genre-filter">
        <option value="" disabled selected>Genre</option>
        <optgroup label="HIP HOP / R&B"></optgroup>
        <option value="volvo">Hip Hop</option>
        <option value="saab">Trap</option>
        <option value="mercedes">R&B</option>
        <option value="audi">Soul</option>
        <option value="volvo">Reggaeton</option>
        <option value="saab">Dancehall</option>
        <option value="mercedes">Moombahton</option>
        <option value="audi">Future Bass</option>
        <option value="audi">GlitchHop</option>
        <optgroup label="HOUSE / TECHNO"></optgroup>
        <option value="volvo">Techno</option>
        <option value="saab">House</option>
        <option value="mercedes">Tech House</option>
        <option value="audi">Deep House</option>
        <option value="volvo">Disco</option>
        <option value="saab">Electro</option>
        <option value="mercedes">Minimal Techno</option>
        <option value="audi">Hard Techno</option>
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
      <select name="cars" id="cars" className="downloads-filter">
        <option value="" disabled selected>Downloads</option>
        <option value="volvo">High to Low</option>
        <option value="saab">Low to High</option>
      </select>
    </div>
  )
}

function PriceFilter(){
  return(
    <div className="price-filter-wrapper">
      <select name="genre" id="genre" className="price-filter">
        <option value="" disabled selected>Price</option>
        <option value="volvo">High to Low</option>
        <option value="saab">Low to High</option>
      </select>
    </div>
  )
}

function BpmFilter(){
  return(
    <div className="bpm-filter-wrapper">
      <input type="range" min="1" max="200" class="slider" id="myRange"/>
    </div>
  )
}

function KeyFilter(){
  return(
    <div className="key-filter">
      <select name="cars" id="cars">
        <option value="" disabled selected>Key</option>
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
      <button>Search</button>
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
    await fetch('http://www.beatcaveapi.com/beats')
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
        <AudioPlayer
        className="beats-audio-player"
          key={index}
          src={soundObj.mp3path}
          onPlay={e => console.log("onPlay")}
          // other props here
        />
      )
    })
  }

  render(){
    const {error, isLoaded, beats} = this.state;
    const listitems = beats.map((beat) => <li key={beat.id}>{beat.name}</li>);
    return(
      <div className="beats-wrapper">
        <div className="beats-left-wrapper">
          <Filters/>
        </div>
        <div className="beats-right-wrapper">
          <div className="beats-container">
            <ul>
              <h1>Welcome to BeatCave</h1>
              {this.RenderBeats(beats)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}