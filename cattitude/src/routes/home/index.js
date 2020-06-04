import { Component } from 'preact';
import { route } from 'preact-router'
import style from './style';

export default class Home extends Component {
  state = {
    moods: []
  }
  
  componentDidMount() {
    this.setState( { moods: JSON.parse(localStorage.getItem('moods')) })
  }

  render(props, state){
    console.log(state.moods);
    return (
      <p>home</p>
    );
  }
}
