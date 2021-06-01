import React, { useState } from "react";

import { DropBtn, DropdownContent, Dropdown } from "../MenuBarStyles";

import menu from "../data/menudata";

const ContentButton = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {menu.children.map((outerMap, i) => (
        <Dropdown>
          {outerMap.id === 2 && (
            <DropBtn onClick={handleToggle} key={i}>
              {outerMap.name}
            </DropBtn>
          )}

          <DropdownContent toggle={toggle}>
            {outerMap.id === 2 &&
              outerMap.secondchild.map((innerMap, i) => (
                <li key={i}>{innerMap.name}</li>
              ))}
          </DropdownContent>
        </Dropdown>
      ))}
    </>
  );
};

export default ContentButton;
