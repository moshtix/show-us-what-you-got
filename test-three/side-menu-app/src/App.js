import * as React from 'react';
import './App.css';
import SideMenu from './components/SideMenu';
import MenuData from './menu-data.json';

function App() {
  return (
    <div className="App">
      <div className="PageContainer">
        <div className="LeftContainer">
          <SideMenu MenuItems={MenuData}/>
        </div>
        <div className="RightContainer">
        </div>
      </div>
    </div>
  );
}

export default App;