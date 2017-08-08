import React, { Component } from 'react';
import './App.css';
import Nav from './components/Navigation.js';
// import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="container">
        <Nav
          item={items}/>
      </div>
    )
  }
}

const items = [['Account','/'], ['Design','/design'], ['Content','/content'], ['Reporting','/reporting']];

export default App;
