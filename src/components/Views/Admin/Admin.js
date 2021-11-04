import React, {PureComponent} from 'react';
import { BarChart, Bar, LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


/**
 * Function returns number of sales and 
 * total sales by week in a bar and line graph.
 * @param {*} props pass through our chart data.
 * @returns Graph display.
 */
function ChartsWeekly(props){
    console.log(props.salesData);
    return(
        <div width="100%" height="100%">
        <select className="timeline" id="timeline" onChange={props.setChartTimeLine} defaultValue={"weekly"}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
        </select>
        <BarChart width={600} height={300} data={props.salesData}>
          <Bar dataKey="productSold" fill="black" />
          <XAxis dataKey="name" />
          <YAxis dataKey="productSold"/>
        </BarChart>
        <LineChart width={600} height={300} data={props.salesData}>
            <Line dataKey="totalSales" fill="black" />
            <XAxis dataKey="name" />
            <YAxis dataKey="totalSales"/>
        </LineChart>
      </div>
    )
}

function Charts(props){
    if(props.chartTimeLine === "daily"){
        return(
            <div className="admin-wrapper">
                <h3>Daily</h3>
            </div>
        );
    }else if(props.chartTimeLine === "weekly"){
        return (
            <div className="admin-wrapper">
                <ChartsWeekly 
                    salesData={props.salesData} 
                    setChartTimeLine={props.setChartTimeLine}
                />
            </div>
        );
    }else{
        return (
            <h3>Yearly</h3>
        );
    }
}

export default class Admin extends PureComponent {
    constructor() {
        super();
        this.state = {
          isLoaded: false,
          salesData: null,
          chartTimeLine: "weekly"
        }
        this.setChartTimeLine = this.setChartTimeLine.bind(this);
      }

    async fetchProductsSoldWeekly(){
        await fetch('https://www.beatcaveapi.com/admin/weeklysales/')
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                salesData: result.elements
            });
            },(error) =>{
                this.setState({
                    isLoaded: true, 
                    error
                });
            }
        )
    }

    setChartTimeLine(event){
        //console.log(event.target.value)

        this.setState({
            chartTimeLine: event.target.value,
        });
    }

    componentDidMount(){
        this.fetchProductsSoldWeekly();
    }

  render() {
    const {salesData, isLoaded, chartTimeLine} = this.state;
    if(isLoaded){
        return(
            <Charts salesData={salesData} chartTimeLine={chartTimeLine} setChartTimeLine={this.setChartTimeLine}/>
        )
    }else{
        return(
            <h1>Loading</h1>
        )
    }
  }
}
