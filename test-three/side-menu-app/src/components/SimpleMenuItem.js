import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconsHandler from './IconsHandler'
import '../styles/style.css';

export default function SimpleMenuItem({ name, subItems, icons }) {

  return ( 
    <>
      <ListItem button className="subOptionsButton">
        <IconsHandler name={name}/>
        <ListItemText>{name}</ListItemText>
      </ListItem>
    </>   
  );
}