'use strict';

import React from 'react';
import ReactDOM, { render } from 'react-dom';

//Import Base Components
import MenuApp from './components/MenuApp';

//Import Base Styles
require('./styles/main');

render((
    <MenuApp />
), document.getElementById("app"));