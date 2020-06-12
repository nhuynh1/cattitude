import { h, Component } from 'preact';
import { route } from 'preact-router';

import db from '../../db';
import style from './style';

import StickyBackNav from '../../components/stickybacknav';
import Chart from '../../components/chart';


const getData = async (startDate, endDate) => {    
    return await db.table('moods')
            .where("dateTime")
            .between(startDate, endDate, true, true)
            .toArray(moodArr => {
              return moodArr.reduce((chartData, mood) => {
                let foundIndex = chartData.findIndex(rowData => rowData.mood === mood.mood);
                if(foundIndex === -1){
                  chartData.push({emoji: mood.emoji, mood: mood.mood, count: 1});
                } else {
                  chartData[foundIndex].count++;
                }
                return chartData;
              },[]);
            });
  }

export default class Summary extends Component {
  
  constructor() {
    super();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    
    this.state = {
      startDate: startDate,
      endDate: new Date(),
      chartData: []
    }
  }
  
  componentDidMount() {
    const { startDate, endDate } = this.state;
    getData(startDate, endDate)
              .then(chartData => {
                this.setState({startDate: startDate, endDate: endDate, chartData: chartData})
      });
  }
  
  goBackOneWeek = () => {
    const { startDate, endDate } = this.state;
    const weekInMillisecs = 7 * 24 * 60 * 60 * 1000;
    const newStartDate = new Date(startDate.getTime() - weekInMillisecs);
    const newEndDate = new Date(endDate.getTime() - weekInMillisecs);

    getData(newStartDate, newEndDate)
            .then(chartData => {
              this.setState({startDate: newStartDate, endDate: newEndDate, chartData: chartData})
    });
  }
  
  goForwardOneWeek = () => {
    const { startDate, endDate } = this.state;
    const weekInMillisecs = 7 * 24 * 60 * 60 * 1000;
    const newStartDate = new Date(startDate.getTime() + weekInMillisecs);
    const newEndDate = new Date(endDate.getTime() + weekInMillisecs);

    getData(newStartDate, newEndDate)
            .then(chartData => {
              this.setState({startDate: newStartDate, endDate: newEndDate, chartData: chartData})
    });
  }
  

  
  render(props, state) {
    const { week, month, year }  = props;
    const { startDate, endDate, chartData } = state;
    return (
      <div class={ style.summary }>
       <StickyBackNav />
        <div>
          <h1>Summary</h1>
          <button type="button" onClick={ this.goBackOneWeek }>gobackoneweek</button>
          <button type="button" onClick={ this.goForwardOneWeek }>goforwardoneweek</button>
          <Chart chartData={ chartData } startDate={ startDate } endDate={ endDate }/>
        </div>
      </div>
    )
  }
}