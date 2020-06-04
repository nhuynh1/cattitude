import { Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';
import New from '../routes/new';


// Set initial default moods, but also get settings from localstorage or user account (database)
const moodItems = [
  { mood: 'good', emoji: '🙂', src: 'slightly-smiling-face_1f642.png'}, 
  { mood: 'great', emoji: '😃', src: ''},
  { mood: 'anxious', emoji: '😬', src: ''},
  { mood: 'worried', emoji: '😟', src:''},
  { mood: 'sad', emoji: '😭', src: ''}
];

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

  

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Home path="/" />
          <New path="/new" moods={moodItems}/>
				</Router>
			</div>
		);
	}
}
