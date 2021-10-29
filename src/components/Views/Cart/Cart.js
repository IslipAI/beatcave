import React, {Component} from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

function RenderBeats(props){
  //console.log(props.beats)

  return props.beats.map((element, index) =>{
    //console.log(index)
    return(
      <div className="cart-beat-wrapper"  key={index}>
        <p>Beat</p>
        <p>{element.name} - {element.artistname}</p>
        <p>${element.price}</p>
      </div>
    )
  })
}

function RenderEvents(props){
  //console.log(props.events)

  return props.events.map((element, index) =>{
    //console.log(index)
    return(
      <div className="cart-beat-wrapper"  key={index}>
        <p>Event</p>
        <p>{element.name}</p>
        <p>${element.price}</p>
      </div>
    )
  })
}

function RenderPrice(props){
  var preTotal = 0;
  var tax = 0;
  var total = 0

  props.beats.forEach(element => {
    preTotal = preTotal + element.price;
  });

  props.events.forEach(element => {
    preTotal = preTotal + element.price;
  });

  tax = preTotal * 0.13;

  total = preTotal + tax;

  sessionStorage.setItem('cartTotal', total.toFixed(2));
  //console.log(preTotal)

  if(total == 0){
    return (
      <div className="cart-price-wrapper">
        <p>Hmm...Seems like there is nothing in your cart!</p>
      </div>
    )
  }else{
    return(
      <div className="cart-price-wrapper">
        <h3>Pre-Total: ${preTotal.toFixed(2)}</h3>
        <h3>Tax: ${tax.toFixed(2)}</h3>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button><Link to='/payment'>Check Out</Link></button>
      </div>
    )
  }
}

export default class Cart extends Component{
  constructor(props){
    super(props);
    this.state = {
        error: null, 
        isLoaded: false, 
        beats: [],
        beatIds: '',
        events: [],
        eventIds: '',
        total: 0,
    };
  }

  async fetchAPI(){
    const {beatIds, eventIds} = this.state;
    //console.log(beatIds)

    //Fetch Beat data by IDS.
    await fetch('https://www.beatcaveapi.com/beats/ids/' + beatIds)
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

    //Fetch Event data by IDS.
    await fetch('https://www.beatcaveapi.com/events/ids/' + eventIds)
    .then(res => res.json())
    .then((result) => {
      this.setState({
          isLoaded : true,
          events: result.elements
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

  setItemIds(){
    var beatsCart = sessionStorage.getItem('beatsCart');
    var eventsCart = sessionStorage.getItem('eventsCart');
    this.setState({
      beatIds: beatsCart,
      eventIds: eventsCart,
    });
  }

  async componentDidMount() {
    await this.setItemIds();
    await this.fetchAPI();
  }


  render(){
    const {beats, events} = this.state;
    return(
      <div className="cart-wrapper">
        <div className='cartTitle'>
          <h1>Shopping Cart:</h1>
        </div>
        <RenderBeats beats={beats}/>
        <RenderEvents events={events}/>
        <RenderPrice beats={beats} events={events}/>
      </div>
    );
  }
}