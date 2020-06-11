import style from './style.css';
import { Component } from 'preact';

class Card extends Component {
  
  formatDate = (dateObj) => {
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', dateOptions).format(dateObj);
  }

  
  render(props) {
    const { emoji, date, mood, note } = props;
    return (
      <div class={ style.card }>
        <span class={ style.emoji }>{ emoji }</span>
        <span class={ style.date }>{ this.formatDate(date) }</span>
        <span class={ style.mood }>{ mood }</span>
        <p class={ style.note }>{ note }</p>
      </div>
    );
  }
}

export default Card;