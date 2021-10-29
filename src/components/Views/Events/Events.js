import React, {Component} from 'react';
import '../Events/Events.css';
import {ReactComponent as AddCart} from '../../Icons/add_shopping_cart_white_24dp.svg';


function EventsDisplay(props){
  //console.log(props.events)
  return props.events.map((events, index) =>{
      return(
        <div className="eventContainer"  key={index}>
            <h4>{events.name}</h4>
            <p>{events.description}</p>
            <p>{events.venue}</p>
            <p>{events.venueaddress}</p>
            <p>{events.date.split('T')[0]}</p>
            <p>{events.starttime} - {events.endtime}</p>
            <h4>${events.price}</h4>
            <AddCart className="add-cart-events" onClick={()=> AddToCart(events.id)}/>
        </div>
      )
    })
}

function AddToCart(id){
  var eventsCart = sessionStorage.getItem('eventsCart');
  if(eventsCart == null){
    sessionStorage.setItem('eventsCart', id)
  }else{
    eventsCart = sessionStorage.getItem('eventsCart');

    eventsCart = eventsCart + ',' + id;
    sessionStorage.setItem('eventsCart', eventsCart)
  }
  //console.log(eventsCart);
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
      await fetch("https://www.beatcaveapi.com/events/")
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