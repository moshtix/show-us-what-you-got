import React, { Component } from 'react';
import{Route, NavLink, HashRouter} from "react-router-dom";
import Pages from'./Pages';
import Links from'./Links';
import Widgets from'./Widgets';

import PostData from '../data/menu-data.json';

class Content extends Component {
  render() {
    return (
      <div>
        {PostData.map(index=> {
          return(

          <HashRouter>
            <div>
              <ul className="header">
                <li><NavLink to="/Content/Pages">{index.children[2].children[0].name}</NavLink></li>
                <li><NavLink to="/Content/Links">{index.children[2].children[1].name}</NavLink></li>
                <li><NavLink to="/Content/Widgets">{index.children[2].children[2].name}</NavLink></li>
              </ul>
              <div className="content">
                    <Route path="/Content/Pages" component={Pages}/>
                    <Route path="/Content/Links" component={Links}/>
                    <Route path="/Content/Widgets" component={Widgets}/>
              </div>
            </div>
          </HashRouter>
        )})}
        </div>
    );
  }
}

export default Content;
