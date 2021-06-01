import React, { useState } from "react";

import { DropBtn, DropdownContent, Dropdown } from "../MenuBarStyles";

import menu from "../data/menudata";

const AccountButton = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {menu.children.map((outerMap, i) => (
        <Dropdown>
          {outerMap.id === 1 && (
            <DropBtn onClick={handleToggle} key={i}>
              {outerMap.name}
            </DropBtn>
          )}

          <DropdownContent toggle={toggle}>
            {outerMap.id === 1 &&
              outerMap.firstchild.map((innerMap, i) => (
                <li key={i}>{innerMap.name}</li>
              ))}
          </DropdownContent>
        </Dropdown>
      ))}
    </>
  );
};

export default AccountButton;
