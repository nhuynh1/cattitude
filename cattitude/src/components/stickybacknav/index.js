import { h, Component } from 'preact';
import { route } from 'preact-router';

class StickyBackNav extends Component {
  
  goBack = () => {
    history.back();
  }
  
  render(props) {
    return (
      <Fragment>
        <button type="button" onClick={ this.goBack }>back</button>
      </Fragment>
    )
  }
}

export default StickyBackNav;