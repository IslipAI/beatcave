import React, { Component, useState } from 'react';
import '../Purchases/Purchases.css';

/**
 * Function renders purchase container.
 * @param {*} props - data about purchase
 * @returns Container displaying purchase data.
 */
function Purchase(props) {
    //console.log(props.data.id)
    const { id, name, purchasedate, purchasetotal } = props.data;
    return(
        <div className="purchases">
            <h4>ID: {id}</h4>
            <h4>Name: {name}</h4>
            <h4>Purchase Date:{purchasedate.split('T')[0]}</h4>
            <h4>Cart Total: ${purchasetotal}</h4>
        </div>
    )
  }

  /**
   * Function renders pagination component.
   * @param {*} param 
   * @returns purchase containers paginated.
   */
  function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    /**
     * Sets page to next page.
     */
    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }
  
    /**
     * Sets page to previous page.
     */
    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }
  
    /**
     * Sets page to clicked page.
     * @param {} event - page number clicked.
     */
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
  
    /**
     * Function gets data related to page.
     * @returns data to display.
     */
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };
  
    /**
     * Function calculates the pages to display.
     * @returns Array of pages.
     */
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

  
    return (
        <div>
        <h1>{title}</h1>
    
        <div className="dataContainer">
          {getPaginatedData().map((d, idx) => (
            <RenderComponent key={idx} data={d} />
          ))}
        </div>
    
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          >
            prev
          </button>
    
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? 'active' : null}`}
            >
              <span>{item}</span>
            </button>
          ))}
    
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
          >
            next
          </button>
        </div>
      </div>
    );
  }

  /**
   * Purchases component.
   */
export default class Purchases extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null, 
            isLoaded: false, 
            purchases: []
        };
      }

      /**
       * Fetches purchase history API endpoint and sets data.
       * @param {*} id - users id
       */
      async fetchAPI(id){
        await fetch('https://www.beatcaveapi.com/users/user/orders/' + id.toString() +'/')
        .then(res => res.json())
        .then((result) => {
                this.setState({
                    isLoaded : true,
                    purchases: result.elements
                });
                //console.log(result.elements);
    
            },(error) =>{
                this.setState({
                    isLoaded: true, 
                    purchases: [],
                });
            }
        )
      }

   
    /**
     * Function decryptes ID from JWT.
     * @returns user id.
     */
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

    /**
     * Component gets ID from JWT then 
     * retrieves purchase history by ID
     * before render.
     */
    componentDidMount(){
        var id = this.getUserId();
        this.fetchAPI(id)
    }


    /**
     * Components render method.
     * @returns rendered view.
     */
    render() {
        const {purchases, isLoaded} = this.state;

        if(isLoaded){
            return (
                <div className="purchases-wrapper">
                    <div className='purchasesContainer'>
                        <Pagination
                            data={purchases}
                            RenderComponent={Purchase}
                            title="Purchases"
                            pageLimit={3}
                            dataLimit={4}
                        />
                    </div>
                </div>
            )
        }else{
            return (
                <div className="purchases-wrapper">
                    <div className='purchasesTitle'>
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }
    }
}