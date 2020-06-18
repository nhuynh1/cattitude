import { Component, createRef } from 'preact';
import { route } from 'preact-router';

import style from './style.css';

/* SVG ICONS
**
*/
const OptionsIcon = (props) => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill={ props.fill }/></svg>
)


const DeleteDialog = (props) => {
  const { deleteMood, toggleDeleteDialog } = props;
  return(
    <div class={ style['modal-background'] }>
      <div role="dialog" class={ style['delete-dialog'] }>
       <p class={ style['delete-dialog__text'] }>Keeping entries will help you understand yourself. Are you sure you want to delete?</p>
        <button type="button" class="button button-type-cancel" onClick={ toggleDeleteDialog }>Cancel</button>
        <button type="button" class="button button-type-danger" onClick={ deleteMood }>Delete</button>
      </div>
    </div>
  )
}

class Outside extends Component {

  clickOutside = (e) => {
    this.props.handleClickOutside(e, this.wrapperRef);
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutside);
  }
  
  render(props) {
    return (<div ref={ node => this.wrapperRef = node }>{ props.children }</div>)
  }
}


class OptionsMenu extends Component {
  
  state = {
    deleteDialogIsOpen: false
  }
  
  editMood = (moodID) => () => {
    route(`/edit/${moodID}`);
  }
  
  toggleDeleteDialog = () => {
    this.setState(prevState => {
      return { deleteDialogIsOpen: !prevState.deleteDialogIsOpen }
    });
  }
  
  render(props, state) {
    const { deleteDialogIsOpen } = state;
    const { deleteMood } = props;

    return (
      <Fragment>
        <div class={ style['options-menu'] }>
          <ul class={ style['options-menu__list'] }>
            <li class={ style['options-menu__listitem'] }
                onClick={ this.editMood(props.moodID) }>Edit</li>
            <li class={ style['options-menu__listitem'] }
                onClick={ this.toggleDeleteDialog }>Delete</li>
          </ul>
        </div>
        { deleteDialogIsOpen && <DeleteDialog deleteMood={ deleteMood } toggleDeleteDialog={ this.toggleDeleteDialog } /> }
      </Fragment>
    );
  }
}

class OptionsButton extends Component {
  state = {
    menuIsOpen: false  
  }
  
  handleClickOutside = (e, wrapper) => {
    if (wrapper && !wrapper.contains(e.target)) {
      this.setState({menuIsOpen: false});
    }
  }
  
  openMenu = () => {
    this.setState(prevState => {
      return { menuIsOpen: !prevState.menuIsOpen }
    });
  }
  
  render(props, state) {
    const { menuIsOpen } = state;
    const { moodID, deleteMood } = props;
    return (
        <div class={ style.options }>
        { !menuIsOpen && <button type="button" 
                  class={ style['options-button'] } 
                  onClick={ this.openMenu }>
                  <OptionsIcon fill="#5B5B64" />
          </button> }
          { menuIsOpen && 
                <Outside handleClickOutside={ this.handleClickOutside}>
                   <button type="button" 
                      class={ style['options-button'] } 
                      onClick={ this.openMenu }>
                      <OptionsIcon fill="#5B5B64" />
                   </button>
                   <OptionsMenu moodID={ moodID } deleteMood={ deleteMood } />
                </Outside> }
        </div>
    );
  }
}


class Card extends Component {
  
  formatDate = (dateObj) => {
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', dateOptions).format(dateObj);
  }
  
  render(props) {
    const { emoji, date, mood, note, id, deleteMood } = props;
    return (
      <div class={ style.card } key={ id }>
        <OptionsButton moodID={ id } deleteMood={ deleteMood }/>
        <span class={ style.emoji }>{ emoji }</span>
        <span class={ style.date }>{ this.formatDate(date) }</span>
        <span class={ style.mood }>{ mood }</span>
        <p class={ style.note }>{ note }</p>
      </div>
    );
  }
}

export default Card;