import { h, Component } from 'preact';
import { route } from 'preact-router';

import style from './style';
import deleteIcon from '../../assets/appicons/delete.svg';

const DeleteIcon = (props) => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill={ props.fill }/></svg>
)

export default class Moodoption extends Component {
  
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
          { index > 0 ? <button type="button" aria-label="delete mood" class={ style.delete } data-index={ index } onClick={ deleteMood }><DeleteIcon fill="#5B5B64" /></button> : '' }
        </td>
      </tr>
    )
  }
}