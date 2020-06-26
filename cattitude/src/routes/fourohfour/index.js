import { Component } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';

import Footer from '../../components/footer';

export default class FourOhFour extends Component {
  
  render(props, state){
    return (
      <Fragment>
        <div>
          <h1>404</h1>
        </div>
        <Footer />
      </Fragment>
    )
  }
}