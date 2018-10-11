import React, { Component } from 'react';
import{Route, NavLink, HashRouter} from "react-router-dom";
import Themes from'./Themes';
import Gallery from'./Gallery';
import Templates from'./Templates';
import PostData from '../data/menu-data.json';
class Design extends Component {
  render() {
    return (
      <div>
        {PostData.map(index=> {
          return(

          <HashRouter>
            <div>
              <ul className="header">
                <li><NavLink to="/Design/Themes">{index.children[1].children[0].name}</NavLink></li>
                <li><NavLink to="/Design/Gallery">{index.children[1].children[1].name}</NavLink></li>
                <li><NavLink to="/Design/Templates">{index.children[1].children[2].name}</NavLink></li>
              </ul>
              <div className="content">
                    <Route path="/Design/Themes" component={Themes}/>
                    <Route path="/Design/Gallery" component={Gallery}/>
                    <Route path="/Design/Templates" component={Templates}/>
              </div>
            </div>
          </HashRouter>
        )})}
        </div>
    );
  }  
}

export default Design;
