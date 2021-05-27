import { Component } from "react";
import menuJson from "./menu-data.json";

type MenuSubItemProps = {
  name: string;
};

type MenuItemProps = {
  name: string;
  children: any;
};

class MenuSubItem extends Component<MenuSubItemProps> {
  render() {
    return <li>{this.props.name}</li>;
  }
}

class MenuItem extends Component<MenuItemProps> {
  render() {
    return (
      <ul>
        {this.props.name}
        {this.props.children}
      </ul>
    );
  }
}

export class Menu extends Component {
  parseJsonFile() {
    const menuJsonText = JSON.stringify(menuJson);
    const menuJsonObject = JSON.parse(menuJsonText);
  }

  render() {
    this.parseJsonFile();
    return <p>Menu will go here.</p>;
  }
}
