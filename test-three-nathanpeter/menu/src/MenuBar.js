import React from "react";

import {
  MenuContainer,
  DropBtn,
  DropdownContent,
  Dropdown,
} from "./MenuBarStyles";

import menu from "./data/menudata";

const MenuBar = () => {
  return (
    <MenuContainer>
      {menu.children.map((outerMap, i) => (
        <Dropdown>
          <DropBtn key={i}>
            <h2>{outerMap.name}</h2>
          </DropBtn>
          <DropdownContent>
            {outerMap.name === "Account" &&
              outerMap.firstchild.map((innerMap, i) => <li key={i}>{innerMap.name}</li>)}
            {outerMap.name === "Design" &&
              outerMap.secondchild.map((innerMap, i) => <li key={i}>{innerMap.name}</li>)}
              {outerMap.name === "Content" &&
              outerMap.thirdchild.map((innerMap, i) => <li key={i}>{innerMap.name}</li>)}
              {outerMap.name === "Reporting" &&
              outerMap.fourthchild.map((innerMap, i) => <li key={i}>{innerMap.name}</li>)}
          </DropdownContent>
        </Dropdown>
      ))}
    </MenuContainer>
  );
};

export default MenuBar;
