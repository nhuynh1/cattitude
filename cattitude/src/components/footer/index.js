import { Component } from 'preact';

export default class Footer extends Component {
  render() {
    return (
      <div style="margin-bottom: 2rem">
        <span style="font-weight:bold; display: block; text-align:center">Cattitude</span>
        <span style="font-size: 0.75rem; display: block; text-align:center">A mood tracker for humans</span>
        <span style="font-size: 0.75rem; display: block; text-align:center">© { (new Date()).getFullYear() } Nancy Huynh</span>
      </div>
    )
  }
}