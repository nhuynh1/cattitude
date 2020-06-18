import { Component } from 'preact';

import style from './style.css';

export default class Footer extends Component {
  render() {
    return (
      <div class={ style.footer }>
        <span class={ style['footer__brand'] }>Cattitude</span>
        <span class={ style['footer__tagline'] }>A mood tracker for humans</span>
        <span class={ style['footer__copyright'] }>© { (new Date()).getFullYear() } Nancy Huynh</span>
      </div>
    )
  }
}