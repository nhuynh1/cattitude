import { Component } from 'preact';
import { route } from 'preact-router';

import db from '../../db';
import style from './style';

import Mood from '../../components/mood';
import Footer from '../../components/footer';
import BottomNav from '../../components/bottom-nav';

export default class New extends Component {
  
  state = {
    moodSelected: {},
    note: ''
  }
    
  isSelectedMood = mood => {
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
  
  closeClick = () => {
    route('/');
  }
  
  saveClick = async () => {
    const { moodSelected, note } = this.state;
    const currentMood = { ...moodSelected, dateTime: new Date(), note };
    
    await db.table('moods').add(currentMood);
    route('/');
  }
  
  moodClick = mood => (e) => {
    this.setState({ moodSelected: mood });
  }
  
  render(props, state) {
    return (
      <Fragment>
        <div class={style.new}>
          <button type="button" class="close" aria-label="close and return to homepage" onClick={ this.closeClick }><span class="visuallyhidden">Close</span></button>
          <h1>Hi { props.userName }</h1>
          <p>{this.today()}</p>
          <h2>How are you feeling?</h2>
          <p class={style.moodtext}>{state.moodSelected.mood}</p>
          <div class={style.moodsgrid}>
          {props.moods.map(mood => (
            <Mood
              moodName={ mood.mood }
              emoji={ mood.emoji }
              onClick={this.moodClick(mood)}
              isSelected={this.isSelectedMood(mood)}
            />
          ))}
          </div>
          <textarea class={style.note} rows="3" placeholder="Note (optional)" onChange={this.handleChange}></textarea>
          <button type="button" class="save" onClick={this.saveClick} disabled={ state.moodSelected.mood ? false : true }>save</button>
        </div>
        <Footer />
        <BottomNav />        
      </Fragment>
    )
  }
}
