import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Link, Match } from 'preact-router/match';

import style from './style';

//aria-hidden="true" focusable="false"

const ListIcon = (props) => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height={props.size} viewBox="0 0 24 24" width={props.size}><path d="M0 0h24v24H0z" fill="none"/><path class={style.active} d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z" fill={props.fill}/></svg>
)

const ChartIcon = (props) => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height={props.size} viewBox="0 0 24 24" width={props.size}><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill={props.fill}/></svg>
)

const CalendarIcon = (props) => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height={props.size} viewBox="0 0 24 24" width={props.size}><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill={props.fill}/></svg>
)

const SettingsIcon = (props) => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height={props.size} viewBox="0 0 24 24" width={props.size}><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill={props.fill}/></g></svg>
)

const NewIcon = (props) => (
  <svg aria-hidden="true" focusable="false" height={props.size} viewBox="0 0 24 24" width={props.size} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={props.fill}/><circle cx="12" cy="12" r="11.5" stroke={props.fill}/>
  </svg>
)

class BottomNav extends Component {  
  render(){
    const color = {
      onRoute: "#008FFF",
      offRoute: "#6F6F6F"
    }
    
    const size = "28";
    
    return (
      <div class={ style['sticky-bottom'] }>
        <Match path="/">
          { ({ matches }) => (<Link href="/" aria-label="Entries">
                                <ListIcon fill={matches ? color.onRoute : color.offRoute} size={size}/>
                              </Link>) }
        </Match>
        <Match path="/summary/:chart?">
          { ({ matches }) => (<Link href="/summary/weekly" aria-label="Summaries">
                                <ChartIcon fill={matches ? color.onRoute : color.offRoute} size={size}/>
                              </Link>) }
        </Match>
        
        <Match path="/new">
          { ({ matches }) => (<Link href="/new" aria-label="Add new entry">
                                <NewIcon fill={matches ? color.onRoute : color.offRoute} size={size}/>
                              </Link>) }
        </Match>
        
        <Match path="/calendar">
          { ({ matches }) => (<Link href="/calendar" aria-label="Entries">
                                <CalendarIcon fill={matches ? color.onRoute : color.offRoute} size={size}/>
                              </Link>) }
        </Match>
        <Match path="/settings">
          { ({ matches }) => (<Link href="/settings" aria-label="Settings">
                                <SettingsIcon fill={matches ? color.onRoute : color.offRoute} size={size}/>
                              </Link>) }
        </Match>
      </div>
    )
  }
}

export default BottomNav;