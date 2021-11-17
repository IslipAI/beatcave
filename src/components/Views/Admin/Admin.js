import React, {PureComponent} from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis} from 'recharts';
import '../Admin/Admin.css';


/**
 * Function returns number of sales and 
 * total sales by week in a bar and line graph.
 * @param {*} props pass through our chart data.
 * @returns Graph display.
 */
function Chart(props){
    console.log(props.salesData);
    return(
        <div className="chart-container">
        <select className="timeline" id="timeline" onChange={props.setChartTimeLine}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
        </select>      
        <BarChart width={700} height={300} data={props.salesData} className="barchart">
          <Bar dataKey="productSold" fill="black" />
          <XAxis dataKey="name" />
          <YAxis dataKey="productSold"/>
        </BarChart>
        <LineChart width={700} height={300} data={props.salesData} className="linechart">
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
            <div className="salesChart">
                <Chart 
                salesData={props.dailySalesData} 
                setChartTimeLine={props.setChartTimeLine}
                />
            </div>
        );
    }else if(props.chartTimeLine === "weekly"){
        return (
            <div className="salesChart">
                <Chart 
                salesData={props.weeklySalesData} 
                setChartTimeLine={props.setChartTimeLine}
                />
            </div>
        );
    }else{
        return (
            <div className="salesChart">
                <Chart 
                salesData={props.yearlySalesData} 
                setChartTimeLine={props.setChartTimeLine}
                />
            </div>
        );
    }
}

export default class Admin extends PureComponent {
    constructor() {
        super();
        this.state = {
          isLoaded: false,
          dailySalesData: null,
          weeklySalesData: null,
          yearlySalesData: null,
          chartTimeLine: "daily"
        }
        this.setChartTimeLine = this.setChartTimeLine.bind(this);
      }

    async fetchSalesData(){
        await fetch('https://www.beatcaveapi.com/admin/weeklysales/')
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                weeklySalesData: result.elements
            });
            },(error) =>{
                this.setState({
                    isLoaded: true, 
                    error
                });
            }
        )
        await fetch('https://www.beatcaveapi.com/admin/yearlysales/')
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                yearlySalesData: result.elements
            });
            },(error) =>{
                this.setState({
                    isLoaded: true, 
                    error
                });
            }
        )
        await fetch('https://www.beatcaveapi.com/admin/dailysales/')
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                dailySalesData: result.elements
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
        this.fetchSalesData();
    }

  render() {
    const {dailySalesData, weeklySalesData, yearlySalesData, isLoaded, chartTimeLine} = this.state;
    if(isLoaded){
        return(
            <div className="admin-wrapper">
                <h1>Admin Panel</h1>
                <Charts 
                    dailySalesData={dailySalesData}
                    weeklySalesData={weeklySalesData} 
                    yearlySalesData={yearlySalesData}
                    chartTimeLine={chartTimeLine}
                    setChartTimeLine={this.setChartTimeLine}
                />
            </div>
        )
    }else{
        return(
            <h1>Loading...</h1>
        )
    }
  }
}
