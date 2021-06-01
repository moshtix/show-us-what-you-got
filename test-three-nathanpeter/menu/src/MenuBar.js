import React from "react";


import AccountButton from './components/AccountButton'
import ContentButton from './components/ContentButton'
import DesignButton from './components/DesignButton'
import ReportingButton from './components/ReportingButton'

import {MenuContainer} from './MenuBarStyles'

const MenuBar = () => {

return (

    <MenuContainer>
    <AccountButton/>
    <ContentButton/>
    <DesignButton/>
    <ReportingButton/>


    </MenuContainer>

)
};

export default MenuBar;
