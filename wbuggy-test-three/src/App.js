import './App.css';
import ReactDOM from 'react-dom';
import React from 'react';

class MenuElement extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.submenu = props.children;
    this.state = {visible: false};
    this.setVisible = this.setVisible.bind(this);
    this.setInvisible = this.setInvisible.bind(this);
  }

  //functions for a visibility switch that will be assigned to the buttons
  setVisible() {
    this.setState({visible: true});
  }

  setInvisible() {
    this.setState({visible: false});
  }

  render() {
    const visible = this.state.visible;

    if(visible) {
      //for the submenu buttons, I don't have anywhere for them to go in this example...
      //for this to work with a full website, would have to put the target URLs for them in the JSON, then replace the null onclick with a Window.open() or something similar to load that page
      return (
        <div className={this.name} id="topItem">
          <Button onClick={this.setInvisible} name={this.name}/>
          {this.submenu.map((item) => (
            <div className={item.name} id="subItem">
              <Button onClick={null} name={item.name}/>
            </div>
          )
          )}
        </div>
      );
    } else {
      return (
        <div className={this.name} id="topItem">
          <button onClick={this.setVisible}>{this.name}</button>
        </div>
      );
    }
  }
          
}

function Button(props) {
  return <button onClick={props.onClick}>{props.name}</button>
}

function App() {
  //Get menu information from JSON file
  //(I've copied this into my src folder for the sake of being easy to find but haven't changed anything as of yet)
  let menuInfoRequest = new XMLHttpRequest();
  menuInfoRequest.open('GET', process.env.PUBLIC_URL + '/menu-data.json');
  menuInfoRequest.responseType = 'json';

  //error handler
  menuInfoRequest.onerror = function() {
    const error = (
      <p>Error: menu-data.json failed to load</p>
    );

    ReactDOM.render(error, document.getElementById('root'));
  }

  //read JSON and feed element information to element constructor
  menuInfoRequest.onload = function() {
    menuInfoRequest.response.children.forEach(element => {
      console.log(element);
    });

    const contents = (
      <div className="menu">
        {menuInfoRequest.response.children.map((item) =>
          (<MenuElement name={item.name} children={item.children}/>)
        )}
      </div>
    );
    
    ReactDOM.render(contents, document.getElementById('root'));
  }

  menuInfoRequest.send();

  return null;
}

export default App;
