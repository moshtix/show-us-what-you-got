import { Component } from "react";

type MenuSubItemProps = {
  name: string;
};

type MenuItemProps = {
  name: string;
  children: any;
};

class MenuSubItem extends Component<MenuSubItemProps> {
    render(){
        return (<li>{this.props.name}</li>)
    }
}

class MenuItem extends Component<MenuItemProps> {
    render(){
        return (<ul>{this.props.name}{this.props.children}</ul>)
    }
}

export class Menu extends Component {
  render() {
    return <p>Menu will go here.</p>;
  }
}
