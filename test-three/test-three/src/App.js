import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PostData from './data/menu-data.json';
import{Route, NavLink, HashRouter} from "react-router-dom";
import Account from "./Account/Account"
import Content from "./Content/Content"
import Design from "./Design/Design"
import Reporting from "./Reporting/Reporting"

class App extends Component {
  render() {
    return (
  <div>
    {PostData.map(index=> {
      return(

      <HashRouter>
        <div className="menu">
          <ul className="header">
            <li><NavLink to="/Account">{index.children[0].name}</NavLink></li>
            <li><NavLink to="/Content">{index.children[2].name}</NavLink></li>
            <li><NavLink to="/Design">{index.children[1].name}</NavLink></li>
            <li><NavLink to="/Reporting">{index.children[3].name}</NavLink></li>
          </ul>
          <div className="content">
                <Route path="/Account" component={Account}/>
                <Route path="/Content" component={Content}/>
                <Route path="/Design" component={Design}/>
                <Route path="/Reporting" component={Reporting}/>
          </div>
        </div>
      </HashRouter>
    )})}
    </div>
  );
  }
}

export default App;
