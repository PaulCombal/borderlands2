import React, { Component } from 'react';
import Logo from '../assets/logo.svg';

export default class TheHeader extends Component {
  render() {
    return (
      <header className='d-flex align-items-center p-3 mb-4' style={{background: '#f5f3f1'}}>
        <span style={{flex: '1'}}>
          <h2>{this.props.title}</h2>
        </span>
        <span>
          <img src={Logo} width='50' height='50'/>
          </span>
        </header>
      );
    }
  }

  TheHeader.defaultProps = {
    title: ''
  }
