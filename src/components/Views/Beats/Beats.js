import React, {Component} from 'react';
import '../Beats/Beats.css';

function GenreFilter(){
  return(
    <div className="genre-filter">
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  )
}

function DownloadsFilter(){
  return(
    <div className="genre-filter">
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  )
}

function PriceFilter(){
  return(
    <div className="genre-filter">
      <select name="genre" id="genre">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  )
}

function BpmFilter(){
  return(
    <div className="genre-filter">
      <select name="cars" id="cars">
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
      <GenreFilter/>
      <DownloadsFilter/>
      <PriceFilter/>
      <BpmFilter/>
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

  render(){
    const {error, isLoaded, beats} = this.state;
    const listitems = beats.map((beat) => <li key={beat.id}>{beat.name}</li>);
    return(
      <div className="beats-wrapper">
        <div className="beats-left-wrapper">
          <Filters/>
        </div>
        <div className="beats-right-wrapper">
          {listitems}
        </div>
      </div>
    )
  }
}