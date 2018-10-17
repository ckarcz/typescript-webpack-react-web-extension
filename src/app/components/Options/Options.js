import style from './Options.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect()
export default class Options extends Component {

  render() {
    return (
      <div className={style.optionsContainer}>Options</div>
    );
  }

}
