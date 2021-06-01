import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: #2f76cc;
  text-align: center;
`;

export const DropBtn = styled.div`
  background-color: #2f76cc;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

export const DropdownContent = styled.div`
  li {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    :hover {
      background-color: #f0f1f5;
      cursor: pointer;
    }
  }
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 100%;

  display: ${(props) => (props.toggle ? "block" : "none")};
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;
