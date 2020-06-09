import { h, Component } from 'preact';
import { route } from 'preact-router';

import style from './style';

export default class Moodoption extends Component {
//  state = {
//    moodOptions: [{mood: "", emoji: ""}]
//  }
  

//  
//  handleInput = (e) => {
//    const { index, optionpref } = e.target.dataset;
//    const { value } = e.target;
//    const { moodOptions: updatedMoodOptions } = this.state;
//    updatedMoodOptions[index][optionpref] = value;
//    this.setState({ moodOptions: updatedMoodOptions });
//  }
  
  
  render(props, state) {
    const { index, onChange, mood, emoji, deleteMood } = props;
    return (
      <tr>
        <td>
           <input 
            type="text" 
            aria-label="mood" 
            class={ style.moodoption } 
            id={`mood-${index + 1}`} 
            data-index={ index } 
            data-optionpref="mood"
            value={ mood } 
            onChange={ onChange }/>
        </td>
        <td>
          <select
            aria-label="emoji" 
            class={ style.moodselect }
            id={`emoji-${index + 1}`} 
            data-index={ index } 
            data-optionpref="emoji" 
            value={ emoji } 
            onChange={ onChange } >
             <option value="">Select emoji</option>
             <option value="🙂">🙂</option>
             <option value="😃">😃</option>
             <option value="😐">😐</option>
             <option value="😬">😬</option>
             <option value="😟">😟</option>
             <option value="😭">😭</option>
             <option value="😑">😑</option>
           </select>
        </td>
        <td>
          { index > 0 ? <button type="button" data-index={ index } onClick={ deleteMood }>Delete</button> : '' }
        </td>
      </tr>
    )
  }
}