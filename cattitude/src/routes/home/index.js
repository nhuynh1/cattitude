import { Component } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';


import Card from '../../components/card';
import style from './style';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { moods: JSON.parse(localStorage.getItem('moods')) }
  }
  
  componentDidMount() {
//    setTimeout(() => {
//     this.setState( { moods: [{mood: 'blah', emoji: '*', note: '...'}]})
//    }, 2000)
    
//    this.setState( { moods: JSON.parse(localStorage.getItem('moods')) })
  }

  render(props, state){
    const { moods } = state;
    return (
      <Fragment>
      <h1>Moods</h1>
      <Link activeClassName={style.active} href="/new">New</Link>
      <div class={ style.cardgrid }>
      {moods.map((mood, index) => (
        <Card
          emoji={ mood.emoji }
          date={ mood.date }
          mood= { mood.mood }
          note= {mood.note }
        />
       ))}
      </div>
      </Fragment>
    )
  }
}