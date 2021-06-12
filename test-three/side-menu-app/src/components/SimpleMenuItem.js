import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// icons
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';
import '../styles/style.css';

export default function SimpleMenuItem({ name, subItems }) {

  return ( 
    <>
      <ListItem button style={{ paddingLeft: 18 }}>
        <ListItemIcon>
          {name === "Account" && <SettingsOutlinedIcon className="leftIcon" />}
          {name === "Content" && <TocOutlinedIcon className="leftIcon" />}
          {name === "Reporting" && <AssessmentOutlinedIcon className="leftIcon" />}
          {name === "Design" && <BrushOutlinedIcon className="leftIcon" />}
        </ListItemIcon>
        <ListItemText>{name}</ListItemText>
      </ListItem>
    </>   
  );
}