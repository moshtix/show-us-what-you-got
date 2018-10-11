import React, { Component } from 'react';
import{Route, NavLink, HashRouter} from "react-router-dom";
import Scheduling from'./Scheduling';
import Reports from'./Reports';
import Dashboard from'./Dashboard';

import PostData from '../data/menu-data.json';

class Reporting extends Component {
  render() {
    return (
      <div>
        {PostData.map(index=> {
          return(

          <HashRouter>
            <div>
              <ul className="header">
                <li><NavLink to="/Reporting/Scheduling">{index.children[3].children[2].name}</NavLink></li>
                <li><NavLink to="/Reporting/Reports">{index.children[3].children[1].name}</NavLink></li>
                <li><NavLink to="/Reporting/Dashboard">{index.children[3].children[0].name}</NavLink></li>
              </ul>
              <div className="content">
                    <Route path="/Reporting/Scheduling" component={Scheduling}/>
                    <Route path="/Reporting/Reports" component={Reports}/>
                    <Route path="/Reporting/Dashboard" component={Dashboard}/>
              </div>
            </div>
          </HashRouter>
        )})}
        </div>
    );
  }
}

export default Reporting;
