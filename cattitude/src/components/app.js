import { Component } from 'preact';
import { Router } from 'preact-router';

import Footer from './footer';

// Code-splitting is automated for routes
import Home from '../routes/home';
import New from '../routes/new';
import Settings from '../routes/settings';


// Set initial default moods, but also get settings from localstorage or user account (database)
const moodItems = [
  { mood: 'good', emoji: '🙂', src: 'slightly-smiling-face_1f642.png'}, 
  { mood: 'great', emoji: '😃', src: ''},
  { mood: 'neutral', emoji: '😐', src: ''},
  { mood: 'anxious', emoji: '😬', src: ''},
  { mood: 'worried', emoji: '😟', src:''},
  { mood: 'sad', emoji: '😭', src: ''}
];

export default class App extends Component {
	constructor() {
    super();
    this.state = { settings: {} };
  }
  
  componentDidMount() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    if(settings === null) return;
    this.setState({ settings });
  }
  
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

  getSetting = (settingName) => {
    const { settings } = this.state;
    if(Object.keys(settings) === 0 
       && settings.contructor === Object) return;
    return settings[settingName] || "";
  }

	render() {
    console.log(this.getSetting("Name"));
		return (
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Home path="/" />
          <New path="/new" moods={moodItems} userName={this.getSetting("Name")}/>
          <Settings path="/settings" />
				</Router>
      <Footer />
			</div>
		);
	}
}
