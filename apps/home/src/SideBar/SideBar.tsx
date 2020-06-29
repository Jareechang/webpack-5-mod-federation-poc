import * as React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {
    useLocation
} from "react-router-dom";

import * as Routes from '../Routes';

interface Props {
    children: React.ReactNode;
    /**
     * Whether or not menu is open
     * */
    menuIsOpen: boolean;
    /**
     * Toggle menu function
     * */
    toggleMenu: any;
    /**
     * Function to reset menu state to closed 
     * */
    resetMenu: any;
}

const SideBar = (props: Props) => {
    const {
        toggleMenu,
        menuIsOpen,
        resetMenu,
        children 
    } = props;

    const location = useLocation();

    /**
     *
     * Close sidebar during route changes
     *
     * */
    React.useEffect(() => {
        resetMenu();
    }, [location.pathname]);

    return (
        <React.Fragment key="left">
            <SwipeableDrawer anchor="left"
                open={menuIsOpen}
                onClose={_ => toggleMenu()}>
                <Routes.SideBarLinks />
                {children}
            </SwipeableDrawer>
        </React.Fragment>
    );
};


export default SideBar;
