import { Component } from 'preact';
import { Router, route } from 'preact-router';

import db from '../db';
import Footer from './footer';
import StickyBackNav from './stickybacknav';

// Code-splitting is automated for routes
import Home from '../routes/home';
import New from '../routes/new';
import Settings from '../routes/settings';
import Summary from '../routes/summary';


// Set initial default moods, but also get settings from localstorage or user account (database)
const moodItems = [
  { mood: 'good', emoji: '🙂' }, 
  { mood: 'great', emoji: '😃' },
  { mood: 'neutral', emoji: '😐' },
  { mood: 'anxious', emoji: '😬' },
  { mood: 'worried', emoji: '😟' },
  { mood: 'sad', emoji: '😭' }
];

export default class App extends Component {
	constructor() {
    super();
    this.state = { 
      settings: {
        moodOptions: [ {mood: "", emoji: ""} ],
        userName: ""
      } };
  }
  
  async componentDidMount() {
    const getSettings = async () => await db.table('settings').get(0);
    let settings = await getSettings();
    
    if(!settings) {
      await db.table('settings')
              .put({id: 0, userName: '', moodOptions: moodItems});
      settings = await getSettings();
    }
    
    this.setState(state => ({ settings }));
  }
  
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

  handleChange = (e) => {
    const { index, optionpref } = e.target.dataset;
    const { value } = e.target;
    const settings = { ...this.state.settings };
    
    // mood settings
    if(["mood", "emoji"].includes(optionpref)) {
      settings.moodOptions[index][optionpref] = value;
    }
    // other settings
    else {
      settings[optionpref] = value;
    }
    this.setState({settings: settings});
  }
  
  addMood = () => {
    const settings = { ...this.state.settings };
    const updatedMoodOptions = [...settings.moodOptions, {mood: "", emoji: ""}];
    settings.moodOptions = updatedMoodOptions;
    this.setState({ settings: settings });
  }
  
  deleteMood = (e) => {
    const { index } = e.target.dataset;
    const settings = { ...this.state.settings };
    const updatedMoodOptions = [...settings.moodOptions];
    updatedMoodOptions.splice(index, 1);
    settings.moodOptions = updatedMoodOptions;
    this.setState({ settings: settings });
  }
  
  saveSettings = async (e) => {
    e.preventDefault();
    const { settings } = this.state;    
    await db.table('settings').put(settings);
    route('/');
  }
  
	render(props, state) {
    const { settings } = state;
		return (
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<New path="/new" 
					    moods={ settings.moodOptions } 
					    userName={ settings.userName } />
				  <Settings path="/settings" 
					    settings={ settings }
					    moodOptions={ settings.moodOptions } 
					    addMood={ this.addMood } 
					    deleteMood={ this.deleteMood } 
					    onChange={ this.handleChange }
					    saveSettings={ this.saveSettings } />
					 <Summary path="/summary/:chart?" />
				</Router>
      <Footer />
			</div>
		);
	}
}
