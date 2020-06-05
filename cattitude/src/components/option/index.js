import { h, Component } from 'preact';
import { route } from 'preact-router';

import style from './style';

export default class Option extends Component {
  
  state = {};
  
  handleChange = (e) => {
    const { id, value } = e.target;
    const option = {};
    option[id] = value;
    this.setState(option);
  }
  
  saveClick = () => {
    localStorage.setItem('settings', JSON.stringify(this.state));
  }

  createOption = ({ labelText, type="text" }) => {
    return (
      <Fragment>  
        <label for={ labelText }>{ labelText }</label>
        <input type={ type } id={ labelText } onChange={this.handleChange} />
      </Fragment>
    )
  }
  
  render(props, state) {
    console.log(state);
    return (
      <Fragment>
        {this.createOption({labelText: "Name"})}
      </Fragment>
    )
  }
}