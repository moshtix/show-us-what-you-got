import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';

export default function IconsHandler({name}) {

  return(
    <ListItemIcon>
      {name === "Account" && <SettingsOutlinedIcon className="leftIcon" />}
      {name === "Content" && <TocOutlinedIcon className="leftIcon" />}
      {name === "Reporting" && <AssessmentOutlinedIcon className="leftIcon" />}
      {name === "Design" && <BrushOutlinedIcon className="leftIcon" />}
    </ListItemIcon>
  );

}