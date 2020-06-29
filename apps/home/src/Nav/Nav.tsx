import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {
    useLocation
} from "react-router-dom";

import {mapPathToTitle} from '../Routes';

interface Props {
    title: string;
    toggleMenu: any;
}

const Nav = (props: Props) => {
    const location = useLocation();
    const title = mapPathToTitle(location.pathname);

    const toggleMenu = React.useCallback(() => {
        if (typeof props.toggleMenu === 'function') {
            props.toggleMenu();
        }
    }, [props.toggleMenu]);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={_ => toggleMenu()}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">{title}</Typography>
            </Toolbar>
        </AppBar>
    );
};


export default Nav;
