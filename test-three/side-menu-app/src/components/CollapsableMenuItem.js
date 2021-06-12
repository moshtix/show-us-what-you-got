import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//icons (material ui)
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import '../styles/style.css';



export default function CollapsableMenuItem({ name, subItems }) {

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
        <ListItemIcon>
          {name === "Account" && <SettingsOutlinedIcon className="leftIcon" />}
          {name === "Content" && <TocOutlinedIcon className="leftIcon" />}
          {name === "Reporting" && <AssessmentOutlinedIcon  className="leftIcon" />}
	  {name === "Design" && <BrushOutlinedIcon  className="leftIcon" />}
        </ListItemIcon>
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


