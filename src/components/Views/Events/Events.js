import React, {Component} from 'react';
import '../Events/Events.css';
import {ReactComponent as AddCart} from '../../Icons/add_shopping_cart_white_24dp.svg';
import Popup from 'reactjs-popup';


/**
 * Function returns a container filled with 
 * event data. Can add to cart from here.
 * @param {*} props - event data
 * @returns event container
 */
function EventsDisplay(props){
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
            <Popup 
            trigger={<AddCart 
            className="add-cart-events" 
            onClick={()=> AddToCart(events.id)}/>} modal>
                    {close => (
                    <div className="cart-popup">
                      <h3>Add Ticket to Cart?</h3>
                      <div className="actions">
                            <button 
                              className="cart-popup-button" 
                              onClick={() => {AddToCart(events.id); close();}}>
                              Yes
                            </button>
                            <button 
                              className="cart-popup-button" 
                              onClick={() => {close();}}>
                              No
                            </button>
                        </div>
                    </div>
                    )}
            </Popup>
        </div>
      )
    })
}

/**
 * Function inserts id of event 
 * to be added to cart.
 * @param {*} id id of event.
 */
function AddToCart(id){
  try{
    var eventsCart = sessionStorage.getItem('eventsCart');
    if(eventsCart == null){
      sessionStorage.setItem('eventsCart', id)
    }else{
      eventsCart = sessionStorage.getItem('eventsCart');

      eventsCart = eventsCart + ',' + id;
      sessionStorage.setItem('eventsCart', eventsCart)
    }
  }catch(error){
    console.log(error);
  }
}

/**
 * Events class.
 */
export default class Events extends Component{
  constructor(props){
      super(props);
      this.state = {
          error: null,    //error holder
          isLoaded: false,//page state 
          events: []      //event data
      };
    }


  /** 
   * Calls event API.
  */
  async fetchEventsAPI(){
      await fetch("https://www.beatcaveapi.com/events/")
      .then(response => {
          return response.json()
      })
      .then((result) => {
          this.setState({
              isLoaded : true,
              events: result.elements
          });
          //console.log(result.elements);
        })
      .catch((error) =>{
        console.log(error)
        this.setState({
          isLoaded: true, 
          error
        });
      })
  }


  /**
   * Function calls API before render.
   */
  componentDidMount(){
    this.fetchEventsAPI();
  }
  

  /**
   * Components render method.
   * @returns Event view.
   */
  render(){
      return(
          <div className="events-wrapper">
              <div className="eventsTop">
                <h1>Events</h1>
                <h4>Come meet everyone at beatcave and more!</h4>
                <EventsDisplay events={this.state.events}/>
              </div>
          </div>
      )
  }
}