import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';

import style from './style';

class BottomNav extends Component {  
  render(){
    return (
      <div class={ style['sticky-bottom'] }>
        <Link activeClassName={style.active} href="/">Entries</Link>
        <Link activeClassName={style.active} href="/new">New</Link>
        <Link activeClassName={style.active} href="/settings">Settings</Link>
        <Link activeClassName={style.active} href="/summary/weekly">Summary</Link>
      </div>
    )
  }
}

export default BottomNav;