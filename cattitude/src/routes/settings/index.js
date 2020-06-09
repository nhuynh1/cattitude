import { Component } from 'preact';
import { route } from 'preact-router';

import Moodoption from '../../components/moodoption';
import style from './style';

export default class Settings extends Component {
  render(props) {
    const { moodOptions, settings, addMood, deleteMood, onChange, saveSettings } = props;
    return (
      <form onSubmit={ saveSettings }>
        <h1>Settings</h1>
        <div class={ style.optioncard }>
           <h2>Profile</h2>
           <label for="username">Name</label>
           <input 
             type="text" 
             class={ style['option__text'] } 
             id="username" 
             data-optionpref="userName" 
             value={ settings.userName } 
             onChange={ onChange } />
          <label for="email">Email</label>
          <input
            type="email"
            class={ style['option__text'] }
            id="email"
            data-optionpref="email"
            value={ settings.email }
            onChange={ onChange } />
        </div>
        <div class={ [style.moodoptiongrid, style.optioncard].join(' ') }>
          <h2>Moods</h2>
          <table>
            <tr>
              <th>Mood</th>
              <th>Emoji</th>
              <th>Action</th>
            </tr>
          { moodOptions.map((option, index) => (
            <Moodoption 
              index={ index } 
              mood={ option.mood } 
              emoji={ option.emoji } 
              deleteMood={ deleteMood }
              onChange = { onChange }
              />
          ))}
          </table>
          <button type="button" onClick={ addMood }>Add Mood</button>
        </div>
        <button type="submit">Save</button>
      </form>
    )
  }
}