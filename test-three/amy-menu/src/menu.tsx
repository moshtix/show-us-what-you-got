import { Component } from "react";
import menuJson from "./menu-data.json";

type MenuSubItemProps = {
  name: string;
};

type MenuItemProps = {
  name: string;
  children?: any;
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
    return menuJsonObject;
  }

  createMenuRender() {
    const menuJsonObject = this.parseJsonFile()
    const menuRender = menuJsonObject.menu.map(
      (menuItem: any, index: number) => {
        return this.createMenuItems(menuItem, index);
      }
    );

    return menuRender;
  }

  createMenuItems(menuItem: any, index: number): JSX.Element {
    const menuItems = [];
    if (menuItem.children) {
      const subMenuItems = [];
      const menuChildren = menuItem.children.map((ch: any, index: number) => {
        return <MenuSubItem name={ch.name} key={index + ch.name} />;
      });
      subMenuItems.push(...menuChildren);

      menuItems.push(
        <MenuItem name={menuItem.name} key={index + menuItem.name}>
          {subMenuItems}
        </MenuItem>
      );
    }
    else{
        menuItems.push(<MenuItem name={menuItem.name} key = {menuItem.name}/>)
    }
    return <div key={menuItem.name}>{menuItems}</div>;
  }

  render() {
    const menuRender = this.createMenuRender();
    return <div>{menuRender}</div>;
  }
}
