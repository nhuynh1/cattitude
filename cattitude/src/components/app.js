import { Component } from 'preact';
import { Router, route } from 'preact-router';

import Footer from './footer';

// Code-splitting is automated for routes
import Home from '../routes/home';
import New from '../routes/new';
import Settings from '../routes/settings';


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
  
  componentDidMount() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    if(settings === null || !settings.settings.moodOptions) {
      settings = { settings: {} };
      settings.settings.moodOptions = [...moodItems];
    }
    this.setState({ settings: settings.settings });
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
  
  saveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('settings', JSON.stringify(this.state));
    route('/');
  }
  
	render() {
//    console.log(this.state);
    const { settings } = this.state;
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
				</Router>
      <Footer />
			</div>
		);
	}
}
