import { Component } from 'preact';
import { route } from 'preact-router';

import db from '../../db';
import style from './style';

import Mood from '../../components/mood';

export default class Edit extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      moodSelected: {},
      note: '',
      dateTime: ''
    }
  }
  
  componentDidMount() {
    db.table("moods")
      .get(parseInt(this.props.moodID))
      .then(moodResult => {
        this.setState({ 
                        moodSelected: { 
                          mood: moodResult.mood, 
                          emoji: moodResult.emoji },
                        note: moodResult.note,
                        dateTime: new Date(moodResult.dateTime)
                      });
      });
  }
  
  formatDate = (dateObj = new Date(), dateOptions = { month: 'short', day: 'numeric' }) => {
    return new Intl.DateTimeFormat('en-US', dateOptions).format(dateObj);
  }
  
  isSelectedMood = mood => {
    return mood.mood === this.state.moodSelected.mood;
  }
  
  handleChange = (e) => {
    this.setState(prevState => {
      return { moodSelected: { ...prevState.moodSelected }, note: e.target.value }
    })
  }
  
  moodClick = mood => () => {
    this.setState(prevState => {
      return { moodSelected: { ...mood }, note: prevState.note }
    })
  }
  
  handleSaveEdits = (moodID) => () => {
    const { moodSelected, note } = this.state;
    
    db.table('moods')
      .update(parseInt(moodID),
              { 
                mood: moodSelected.mood, 
                emoji: moodSelected.emoji, 
                note: note
              }
             )
      .then(updated => {
        if(updated) {
          console.log("mood updated");
          route('/');
        } else {
          console.log('nothing updated');
          route('/');
        }
    })
  }
  
  handleCancel = () => {
    history.back();
  }
  
  render(props, state) {
    const { moodID, moods:moodOptions } = props;
    return (
      <div class={style.edit}>
        <h1>Editing Mood</h1>
        <p>{this.formatDate(state.dateTime, {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}, your mood was</p>
        <p class={style.moodtext}>{ state.moodSelected.mood }</p>
        <div class={style.moodsgrid}>
          { moodOptions.map(moodOption => (
              <Mood 
                moodName={ moodOption.mood }
                emoji={ moodOption.emoji }
                onClick={ this.moodClick(moodOption) }
                isSelected={ this.isSelectedMood(moodOption) }
              />
          )) }
        </div>
        <textarea class={style.note} rows="3" placeholder="Note (optional)" onChange={ this.handleChange }>
          { state.note }
        </textarea>
        <div class={style.actions}> 
          <button type="button" class="button button-type-cancel" onClick={ this.handleCancel }>Cancel</button>
          <button type="button" class="button button-type-action" onClick={ this.handleSaveEdits(moodID) }>Save Edits</button>
        </div>
      </div>
    )
  }
}