import React, {Component} from 'react';
import '../Events/Events.css';
import {ReactComponent as AddCart} from '../../Icons/add_shopping_cart_white_24dp.svg';


function EventsDisplay(props){
  console.log(props.events[0])
  return props.events.map((events, index) =>{
      return(
        <div className="eventContainer"  key={index}>
            <h4>{props.events[index].name}</h4>
            <p>{props.events[index].description}</p>
            <p>{props.events[index].venue}</p>
            <p>{props.events[index].venueaddress}</p>
            <p>{props.events[index].date.split('T')[0]}</p>
            <p>{props.events[index].starttime} - {props.events[index].endtime}</p>
            <h4>${props.events[index].price}</h4>
            <span>{<AddCart onClick={()=> console.log("Add item to shopping cart")}/>}</span>
        </div>
      )
    })
}


export default class Events extends Component{
  constructor(props){
      super(props);
      this.state = {
          error: null, 
          isLoaded: false, 
          events: []
      };
    }

  //Calls API to get user products by id
  async fetchAPI(){
      await fetch("http://www.beatcaveapi.com/events/")
      .then(response => {
          return response.json()
      })
      .then(
          (result) => {
              this.setState({
                  isLoaded : true,
                  events: result.elements
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

  componentDidMount(){
    this.fetchAPI();
  }
  
  render(){
      return(
          <div className="events">
              <div className="eventsTop">
                <h1>Events</h1>
                <h4>Come meet everyone at beatcave and more!</h4>
              </div>
              <div className="eventsBottom">
                <EventsDisplay events={this.state.events}/>
              </div>
          </div>
      )
  }
}