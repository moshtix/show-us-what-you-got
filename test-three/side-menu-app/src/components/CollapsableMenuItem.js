import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//icons (material ui)
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import IconsHandler from './IconsHandler'
import '../styles/style.css';



export default function CollapsableMenuItem({ name, subItems, icon }) {

  // state to collapse/open the submenu
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  // select sub-menu items
  const [selectedIndex, setSelectedIndex] = React.useState(null)
  const updateSelected = (index) => {
    setSelectedIndex(index);
  }


  return (
    <>
      <ListItem button className="subOptionsButton" onClick={handleClick}>
        <IconsHandler name={name}/>
        <ListItemText disableTypography className="mainOptionText">{name}</ListItemText>
        { open ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subItems.map((subItem, index) => (
            <ListItem button key={subItem} selected={index === selectedIndex} onClick={() => { updateSelected(index); }}  >
              <ListItemIcon>
              	{selectedIndex===index ? <FiberManualRecordIcon fontSize="small" className="leftIcon" /> : ""}
              </ListItemIcon>
              <ListItemText disableTypography primary={subItem.name} className={selectedIndex===index ? "subOptionsTextSelected" : "subOptionsText"} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}


