import React, { Component } from 'react';
import { render } from 'react-dom';

class TestMenu extends Component {
    constructor(props) {
        super(props);
		
		//Data for the menu can be passed as props and can be recursive.
		let data;
		if(this.props.data) {
			data = this.props.data;
		} else {
			//Default data, understand the idea of the specification.
			data = {
				"name": "Test Menu",
				children: [
					{name: "Home"},
					{
						name: "Pages",
						children: [{name: "Home"}, {name: "Contact"}, {name: "Help"}]
					},
					{name:"Contact"}
				]
			};
		}
		
		//Levels, used for styling only
		let level;
		if(this.props.level) {
			level = this.props.level;
		} else {
			level = 0;
		}
		
		
		this.state = {
			data: data,
			level: level
		};
    }

    render() {
		//Build our menu
		let menu = [];
		if(this.state.data.children) {
			for(let i = 0; i < this.state.data.children.length; i++) {
				//Sub Menu setup
				let data = this.state.data.children[i];
				let children = "";
				let clazz = "";
				if(data.children) {
					children = <TestMenu data={data} level={this.state.level+1} />
					clazz += "has-children";
				}
				menu.push((
					<li className={clazz}>
						{data.name}
						{children}
					</li>
				));
			}
		}
		
		//Define classes
		let classes = "test-menu menu-level-" + this.state.level;
		
        return (
			<ul className={classes} id={this.state.data.name}>
				{menu}
			</ul>
        );
    }
}

export default TestMenu;