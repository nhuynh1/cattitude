import { Component } from 'preact';
import { Router, route } from 'preact-router';
import { Link } from 'preact-router/match';

import db from '../../db';
import style from './style';

import Card from '../../components/card';
import Footer from '../../components/footer';
import BottomNav from '../../components/bottom-nav';

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
  
  deleteMood = (moodID) => () => { 
    db.table("moods")
      .delete(moodID)
      .then(result => {
          this.setState(prevState => {
            let updatedMoods = prevState.moods.filter(mood => mood.id !== moodID);
            return { moods: updatedMoods };
        });
      })
  }
  
  render(props, state){
    const { moods } = state;
    return (
      <Fragment>
        <div class={ style.home }>
          <h1>Moods</h1>
          <div class={ style.cardgrid }>
          {moods.map((mood, index) => (
            <Card
              emoji={ mood.emoji }
              date={ mood.dateTime }
              mood={ mood.mood }
              note={ mood.note }
              id={ mood.id }
              deleteMood={ this.deleteMood(mood.id) }
            />
           ))}
          </div>
        </div>
        <Footer />
        <BottomNav />
      </Fragment>
    )
  }
}