import { h, Component } from 'preact';
import { route } from 'preact-router';

import db from '../../db';
import style from './style';

import StickyBackNav from '../../components/stickybacknav';
import Chart from '../../components/chart';

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
  
  async componentDidMount() {
    console.log('mounted summary')
  }
  
      getData = async (startDate, endDate) => {
//    const { startDate, endDate } = this.state;
    
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
  
  goBackOneWeek = () => {
    
    
    this.setState(state => {
      const { startDate, endDate } = state;
      const weekInMillisecs = 7 * 24 * 60 * 60 * 1000;
      const newStartDate = new Date(startDate.getTime() - weekInMillisecs);
      const newEndDate = new Date(endDate.getTime() - weekInMillisecs);
      
//      this.getData(newStartDate, newEndDate)
//            .then(chartData => {
//        return { startDate: newStartDate, endDate: newEndDate, chartData: [] };
//      })
      
      return { startDate: newStartDate, endDate: newEndDate, chartData: [] };
    })
  }
  

  
  render(props, state) {
    const { week, month, year }  = props;
    const { startDate, endDate, chartData } = state;
    console.log({ startDate, endDate, chartData })
    return (
      <div class={ style.summary }>
       <StickyBackNav />
        <div>
          <h1>Summary</h1>
          <button type="button" onClick={ this.goBackOneWeek }>gobackoneweek</button>
          <Chart chartData={ chartData } startDate={ startDate } endDate={ endDate }/>
        </div>
      </div>
    )
  }
}