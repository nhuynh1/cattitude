import style from './style.css';
import { Component } from 'preact';

class Mood extends Component {
  


  
  render(props) {
    return (
      <div class={style.mood}>
        <button type="button" aria-label={props.moodName} class={style.button} onClick={props.onClick} data-isSelected={props.isSelected}><span>{props.emoji}</span></button>
      </div>
    );
  }
}




export default Mood;