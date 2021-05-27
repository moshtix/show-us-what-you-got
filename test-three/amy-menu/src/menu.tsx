import { Component } from "react";
import menuJson from "./menu-data.json";

type MenuItemProps = {
  name: string;
};

class MenuSubItem extends Component<MenuItemProps> {
  render() {
    return (
      <li>
        {this.props.name}
      </li>
    );
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
    const menuJsonObject = this.parseJsonFile();
    const menuRender = menuJsonObject.menu.map((menuItem: any) => {
      return this.createMenuItems(menuItem);
    });

    return menuRender;
  }

  createMenuItems(menuItem: any): JSX.Element {
    const menuItems = [];
    if (menuItem.children) {
      menuItems.push(this.findChildren(menuItem));
    } else {
      menuItems.push(<MenuItem name={menuItem.name} key={menuItem.name} />);
    }
    return <div key={menuItem.name}>{menuItems}</div>;
  }

  findChildren(menuItem: any) {
    const childOfChildFound = (
      <MenuSubItem
        name={menuItem.name}
        children={menuItem.children}
        key={menuItem.name}
      />
    );
    let menuChildren = [childOfChildFound];

    if (menuItem.children) {
      menuChildren = menuItem.children.map((subMenu: any) => {
        if (subMenu.children) {
          return (
            <MenuItem name={subMenu.name} key={subMenu.name}>
              {subMenu.children.map((child: any) => {
                return this.findChildren(child);
              })}
            </MenuItem>
          );
        } else {
          return <MenuSubItem name={subMenu.name} key={subMenu.name} />;
        }
      });
      return (
        <MenuItem name={menuItem.name} key={menuItem.name}>
          {menuChildren}
        </MenuItem>
      );
    }

    return menuChildren;
  }

  render() {
    const menuRender = this.createMenuRender();
    return <div>{menuRender}</div>;
  }
}
