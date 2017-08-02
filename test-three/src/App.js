import React, { Component } from 'react';
import './App.css';
import menuData from './data/menu-data.json';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navigation items={menuData.children} />
        <p>This site is mostly about the menu, tbh.</p>
      </div>
    );
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    }
  }

  setAllInactive () {
    const items = this.state.items.slice();
    for (let i in items) {
      items[i].active = false;
    }
    this.setState({ items });
  }

  toggle (i) {
    if (this.state.items[i].active === true) {
      this.setAllInactive()
    } else {
      this.setAllInactive()
      const items = this.state.items.slice();
      items[i].active = true;
      this.setState({ items });
    }
  }

  render () {
    const navItemsPrimary = this.props.items.map((item, i) => {
      return <NavItemPrimary
              label={item.name}
              children={item.children}
              key={i}
              active={this.state.items[i].active || false}
              onClick={() => this.toggle(i)}
            />;
    });

    return (
      <nav>
        <ul>{navItemsPrimary}</ul>
      </nav>
    )
  }
}

class NavItemPrimary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active
    }
  }

  render () {
    const navItemsSecondary = this.props.children.map((item, i) => {
      return <NavItemSecondary label={item.name} active={this.state.active} path={item.path} key={i} />;
    });

    return (
      <li
        className={this.props.active ? 'active' : 'hide-subs'}
        onClick={() => this.props.onClick()}
      >
        <button>{this.props.label}</button>
        <ul>{navItemsSecondary}</ul>
      </li>
    )
  }
}

class NavItemSecondary extends Component {
  render () {
    return (
      <li>
        <a href={this.props.path}>{this.props.label}</a>
      </li>
    )
  }
}

export default App;
