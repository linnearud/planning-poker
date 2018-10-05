import React, { Component } from 'react';
import './App.css';
import logo from './logo.png'
import {Jumbotron} from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Jumbotron bsClass="jumbo"> 
      	<img src={logo} className="logo" alt="logo" />
      </Jumbotron>
    );
  }
}

export default Header;