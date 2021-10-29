import React, { Component } from 'react';
import '../Purchases/Purchases.css';

//function returns the user display populated with user data
function PurchasesDisplay(props){
    console.log(props.purchases[0])
    return props.purchases.map((purchase, index) =>{
        console.log(props.purchases[0].datesold)
        return(
          <div className="purchases"  key={index}>
              <p>{props.purchases[index].id}</p>
              <p>{props.purchases[index].name}</p>
              <p>{props.purchases[index].purchasedate.split('T')[0]}</p>
              <p>Cart Total: ${props.purchases[index].purchasetotal}</p>
          </div>
        )
      })
}

export default class Purchases extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null, 
            isLoaded: false, 
            purchases: []
        };
      }

      async fetchAPI(id){
        await fetch('https://www.beatcaveapi.com/users/user/orders/' + id.toString() +'/')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded : true,
                    purchases: result.elements
                });
                //console.log(result.elements);
    
            },
            (error) =>{
                this.setState({
                    isLoaded: true, 
                    error
                });
            }
        )
      }

          //Returns stored user id.
    getUserId(){
        const storedToken = sessionStorage.getItem('token');
        if(storedToken != null){
            var tokenBody = storedToken.split('.')[1];
            //console.log(tokenBody);
            var tokenBodyDecoded = Buffer.from(tokenBody, 'base64').toString();
            //console.log(tokenBodyDecoded);
            const tokenBodyJson = JSON.parse(tokenBodyDecoded);
            return tokenBodyJson.sub;
        }
    }

    componentDidMount(){
        var id = this.getUserId();
        this.fetchAPI(id)
    }

    render() {
        return (
            <div>
                <div className='purchasesTitle'>
                    <h1>Purchases:</h1>
                </div>
                <PurchasesDisplay purchases={this.state.purchases}/>
            </div>
        )
    }
}