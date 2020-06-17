import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { Link, Match } from 'preact-router/match';

import db from '../../db';
import style from './style';

import Chart from '../../components/chart';


/* SVG ICONS
**
*/

const BackIcon = (props) => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" fill={ props.fill }/></svg>
)

const ForwardIcon = (props) => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" fill={ props.fill }/></svg>
)

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
  
  formatDate = (dateObj = new Date(), dateOptions = { month: 'short', day: 'numeric' }) => {
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
    let formatDate;
    
    switch(chart){
      case 'weekly':
      default:
        let formatEndDate, formatStartDate;
        if(startDate.getMonth() === endDate.getMonth()){
          formatStartDate = this.formatDate(startDate);
          formatEndDate = `${endDate.getDate()}, ${endDate.getFullYear()}`;
          formatDate = `${formatStartDate} - ${formatEndDate}`;
        }
        else if(startDate.getYear() !== endDate.getYear()){
          formatStartDate = this.formatDate(startDate, 
                                            {month: 'short', day: 'numeric', year: 'numeric'})
          formatEndDate = this.formatDate(endDate, 
                                          {month: 'short', day: 'numeric', year: 'numeric'});
          formatDate = `${formatStartDate} - ${formatEndDate}`;
        }
        else {
          formatStartDate = this.formatDate(startDate);
          formatEndDate = `${this.formatDate(endDate)}, ${endDate.getFullYear()}`;
          formatDate = `${formatStartDate} - ${formatEndDate}`;
        }
        break;
      case 'monthly':
        formatDate = this.formatDate(startDate, 
                                     { month: 'short', year: 'numeric' });
        break;
      case 'yearly':
        formatDate = this.formatDate(startDate, { year: 'numeric' });
        break;
    }
    
    return (
      <div class={ style['date-heading-area'] }>
       <button type="button" 
               onClick={ this.goOne(chart, 'back') }
               class={ style['date-back-forward'] }
               aria-label={ `go back one ${chart.slice(0, -2)}` } >
               <BackIcon fill="#5B5B64" />
        </button>
        <h2 class={ style['date-heading'] }>
          { formatDate }
        </h2>
        <button type="button" 
                onClick={ this.goOne(chart, 'forward') }
                class={ style['date-back-forward'] }
                aria-label={ `go forward one ${chart.slice(0, -2)}` } >
                <ForwardIcon fill="#5B5B64" />
        </button>
      </div>
    )
  }
  
  render(props, state) {
    const { chart }  = props;
    const { startDate, endDate, chartData } = state;
    return (
      <div class={ style.summary }>
      <Router onChange={ this.handleRoute } />
       
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