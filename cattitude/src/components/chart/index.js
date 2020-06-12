import { h, Component } from 'preact';

import db from '../../db';
import style from './style.css';

const Bar = (props) => {
  const { width, emoji, mood, count } = props;
  return (
    <div class={ style['chart-row'] }>
      <span class={ style.emoji }>{ emoji }</span>
      <p class={ style.mood }>{ mood }</p>
      <div class={ style.bar} style={ `width:${width};` }>{ count }</div>
    </div>
  )
}


class Chart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      chartData: []
    }
  }
  
  maxCount = chartData => {
    return Math.max(...chartData.map(rowData => rowData.count));
  }
  
  formatDate = dateObj => {
    const dateOptions = { month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', dateOptions).format(dateObj);
  }
  
  render (props, state) {
    const { chartData, startDate, endDate } = props;    
    const maxCount = this.maxCount(chartData);
    
    return (
      <Fragment>
       <h2>{ `${this.formatDate(startDate)} - ${this.formatDate(endDate)}` }</h2>
        <div class={ style.chart }>
          { chartData.map((entry) => (
            <Bar width={ `${entry.count / maxCount * 100}%` } emoji={ entry.emoji } count={ entry.count } mood={ entry.mood } />
          )) }
        </div>
      </Fragment>
    );
  }
}

export default Chart;