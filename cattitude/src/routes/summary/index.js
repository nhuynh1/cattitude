import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { Link, Match } from 'preact-router/match';

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

const getStartEndDates = (range = 'weekly', refDate) => {
  const startDate = refDate ? new Date(refDate) : new Date();
  startDate.setHours(0, 0, 0)
  const endDate = refDate ? new Date(refDate) : new Date();
  endDate.setHours(23, 59, 59);

  switch(range) {
    case 'weekly':
    default:
      let diff = startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1);
      startDate.setDate(diff);
      endDate.setDate(startDate.getDate() + 6);
      break;
    case 'monthly':
      startDate.setDate(1);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      break;
    case 'yearly':
      startDate.setMonth(0, 1);
      endDate.setMonth(11, 31);
      break;
  }
  
  return { startDate, endDate };
}

export default class Summary extends Component {
  
  constructor(props) {
    super(props);
    const dateRange = getStartEndDates(this.props.chart);
    
    this.state = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      chartData: []
    }
  }
  
  componentDidMount() {
    const { startDate, endDate } = this.state;
    getData(startDate, endDate)
              .then(chartData => {
                this.setState({startDate: startDate, endDate: endDate, chartData: chartData});
      });
    
  }
  
  formatDate = dateObj => {
    const dateOptions = { month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', dateOptions).format(dateObj);
  }
  
  goOne = (range = 'weekly', direction = 'back') => () => {
    const { startDate } = this.state;
    let newStartDate = new Date(startDate);
    let sign = 0;
    if (direction === 'back') sign = -1;
    if (direction === 'forward') sign = 1;
    
    switch(range){
      case 'weekly':
      default:
        newStartDate.setDate(startDate.getDate() + (7 * sign));
        break;
      case 'monthly':
        newStartDate.setMonth(startDate.getMonth() + (1 * sign));
        break;
      case 'yearly':
        newStartDate.setFullYear(startDate.getFullYear() + (1 * sign));
        break;
    }
    
    const newDateRange = getStartEndDates(range, newStartDate);
    getData(newDateRange.startDate, newDateRange.endDate)
            .then(chartData => {
              this.setState({startDate: newDateRange.startDate, endDate: newDateRange.endDate, chartData: chartData})
    });
  }
  
  
  handleRoute = () => {
    const { chart } = this.props; // from the url
    const dateRange = getStartEndDates(chart);    
    getData(dateRange.startDate, dateRange.endDate)
            .then(chartData => {
              this.setState({startDate: dateRange.startDate, endDate: dateRange.endDate, chartData: chartData});
        });
  }

  renderDateHeading = (startDate, endDate, chart) => {
    let formattedEndDate = startDate.getMonth() === endDate.getMonth() ? 
                            endDate.getDate() : this.formatDate(endDate);
    return (
      <div style="display:grid;grid-template-columns:auto 1fr auto;align-items: center">
       <button type="button" onClick={ this.goOne(chart, 'back') }>back</button>
        <h2 style="text-align:center">{ `${this.formatDate(startDate)} - ${formattedEndDate}` }</h2>
        <button type="button" onClick={ this.goOne(chart, 'forward') }>foward</button>
      </div>
    )
  }
  
  render(props, state) {
//    console.log('render');
    const { chart }  = props;
//    console.log(chart);
    const { startDate, endDate, chartData } = state;
//    console.log(chartData);
    return (
      <div class={ style.summary }>
       <StickyBackNav />
      <Router onChange={this.handleRoute} />
       
        <div>
          <h1>Summary</h1>
          <div style="display:flex">
            <Link activeClassName={style.active} class={style['range-option']} href="/summary/weekly">Weekly</Link>
            <Link activeClassName={style.active} class={style['range-option']} href="/summary/monthly">Monthly</Link>
            <Link activeClassName={style.active} class={style['range-option']} href="/summary/yearly">Yearly</Link>
          </div>
          {this.renderDateHeading(startDate, endDate, chart)}
          
          
          <Chart chartData={ chartData } startDate={ startDate } endDate={ endDate } chart={ chart }/>
        </div>
      </div>
    )
  }
}