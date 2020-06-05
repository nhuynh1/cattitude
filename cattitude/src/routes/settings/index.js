import { Component } from 'preact';
import { route } from 'preact-router';

import Option from '../../components/option';
import style from './style';

export default class Settings extends Component {
  render(props, state) {
    return (
      <Fragment>
        <p>settings</p>
        <Option />
      </Fragment>
    )
  }
}