import { Component } from 'preact';
import { route } from 'preact-router';

import Mood from '../../components/mood';
import style from './style';


export default class New extends Component {
  
  state = {
    moodSelected: {},
    note: ''
  }
  
  getSelectStatus = mood => {
    return mood === this.state.moodSelected;
  }
  
  today = () => {
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', dateOptions).format(now);
  }
  
  handleChange = (e) => {
    this.setState({ note:  e.target.value })
  }
  
  saveClick = () => {
    const { moodSelected, note } = this.state;
    const localVar = 'moods'
    let currentMood = { ...moodSelected, date: (new Date()).toString(), note };
    let storedMoods = JSON.parse(localStorage.getItem(localVar)) || [];
    let updatedMoods = [...currentMood, ...storedMoods];
    localStorage.setItem(localVar, JSON.stringify(updatedMoods));
    route('/');
  }
  
  moodClick = mood => (e) => {
    this.setState({ moodSelected: mood });
  }
  
  render(props, state) {
    return (
      <div class={style.new}>
        <h1>Hi [Name]</h1>
        <p>{this.today()}</p>
        <h2>How are you feeling?</h2>
        <p class={style.moodtext}>{state.moodSelected.mood}</p>
        <div class={style.moodsgrid}>
        {props.moods.map(mood => (
          <Mood
            moodName={ mood.mood }
            emoji={ mood.emoji }
            onClick={this.moodClick(mood)}
            isSelected={this.getSelectStatus(mood)}
          />
        ))}
        </div>
        <textarea class={style.note} placeholder="Note (optional)" onChange={this.handleChange}></textarea>
        <button type="button" class={style.save} onClick={this.saveClick} disabled={ state.moodSelected.mood ? false : true }>save</button>
      </div>
    )
  }
}
