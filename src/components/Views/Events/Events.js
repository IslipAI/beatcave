import React, {Component} from 'react';


function EventsDisplay(props){
  console.log(props.events[0])
  return props.events.map((events, index) =>{
      return(
        <div className=""  key={index}>
            <p>{props.events[index].name}</p>
            <p>{props.events[index].venue}</p>
            <p>{props.events[index].venueaddress}</p>
            <p>{props.events[index].date.split('T')[0]}</p>
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
      await fetch("http://localhost:8000/events/")
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
          <div>
              <h1>Events</h1>
              <EventsDisplay events={this.state.events}/>
          </div>
      )
  }
}