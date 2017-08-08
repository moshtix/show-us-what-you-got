import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

const Account = () => (
  <div>
    <h2>Account</h2>
  </div>
)

const Design = () => (
  <div>
    <h2>Design</h2>
  </div>
)

const Content = () => (
  <div>
    <h2>Content</h2>
  </div>
)

const Reporting = () => (
  <div>
    <h2>Reporting</h2>
  </div>
)

class Nav extends Component {
  // I was unable to add the child elements in time
  render() {
    return (
      <Router>
        <div className="navbar navbar-default navbar-static-top">
          <ul className="nav navbar-nav">
            {this.props.item.map((item, i) =>
              <li key={i}><Link to={item[1]}>{item[0]}</Link></li>
            )}
          </ul>
          <hr/>
          <Route exact path="/" component={Account}/>
          <Route path="/design" component={Design}/>
          <Route path="/content" component={Content}/>
          <Route path="/reporting" component={Reporting}/>
        </div>
      </Router>
    )
  }
}

export default Nav;
