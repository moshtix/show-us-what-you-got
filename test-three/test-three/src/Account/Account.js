import React, { Component } from 'react';
import{Route, NavLink, HashRouter} from "react-router-dom";
import Preferences from'./Preferences';
import ManageUsers from'./ManageUsers';
import ContactDetails from'./ContactDetails';

import PostData from '../data/menu-data.json';

class Account extends Component {
  render() {
    return (
      <div>
        {PostData.map(index=> {
          return(

          <HashRouter>
            <div>
              <ul className="header">
                <li><NavLink to="/Account/Preferences">{index.children[0].children[0].name}</NavLink></li>
                <li><NavLink to="/Account/ManageUsers">{index.children[0].children[2].name}</NavLink></li>
                <li><NavLink to="/Account/ContactDetails">{index.children[0].children[1].name}</NavLink></li>
              </ul>
              <div className="content">
                    <Route path="/Account/Preferences" component={Preferences}/>
                    <Route path="/Account/ManageUsers" component={ManageUsers}/>
                    <Route path="/Account/ContactDetails" component={ContactDetails}/>
              </div>
            </div>
          </HashRouter>
        )})}
        </div>
    );
  }
}

export default Account;
