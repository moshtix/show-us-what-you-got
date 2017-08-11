import React, { Component } from 'react';
import { render } from 'react-dom';
import TestLogo from './Logo/TestLogo';
import TestMenu from './Menu/TestMenu';

const MenuData = require('./../data/menu-data.json');

class MenuApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let junk = [];
        for(let i = 0; i < 100; i++) {
            junk.push(<br />);
        }
        
        return (
            <div>
                <TestLogo />
                <TestMenu data={MenuData} />
                {junk}
            </div>
        );
    }
}

export default MenuApp;