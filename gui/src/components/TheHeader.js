import React, { Component } from 'react';
import Logo from '../assets/borderlands2.png';

export default class TheHeader extends Component {
  render() {
    return (
      <header className='d-flex align-items-center p-3 mb-4' style={{background: '#f5f3f1'}}>
        <span style={{flex: '1'}}>
          <h2 style={{fontFamily: 'Anton'}}>{this.props.title}</h2>
        </span>
        <span>
          <img src={Logo} height='50' style={{webkitUserDrag: 'none'}}/>
          </span>
        </header>
      );
    }
  }

  TheHeader.defaultProps = {
    title: ''
  }
