import style from './Popup.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect()
export default class Popup extends Component {

  render() {
    return (
      <div className={style.popupContainer}>
        Pop up!
      </div>
    );
  }

}
