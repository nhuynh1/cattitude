import { Component } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';

import db from '../../db';
import style from './style';

import Card from '../../components/card';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { moods: [] }
  }
  
  componentDidMount() {
    db.table("moods")
      .reverse()
      .sortBy('dateTime')
      .then(moods => {
        this.setState(state => ({ moods: moods }))
    });
  }
  
  render(props, state){
    const { moods } = state;
    return (
      <div class={ style.home }>
        <h1>Moods</h1>
        <Link activeClassName={style.active} href="/new">New</Link>
        <Link activeClassName={style.active} href="/settings">Settings</Link>
        <Link activeClassName={style.active} href="/summary">Summary</Link>
        <div class={ style.cardgrid }>
        {moods.map((mood, index) => (
          <Card
            emoji={ mood.emoji }
            date={ mood.dateTime }
            mood= { mood.mood }
            note= {mood.note }
          />
         ))}
        </div>
      </div>
    )
  }
}