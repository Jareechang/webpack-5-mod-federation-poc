import * as React from 'react';
import * as Nav from './Nav';
import * as SideBar from './SideBar';
import {
    BrowserRouter as Router
} from "react-router-dom";

import * as Routes from './Routes';

interface Props {
    title: string;
    page: string;
    /*
     * Custom items in body 
     * **/
    children: React.ReactNode;
}

const AppContainer = (props: Props) => {
    const {
        title,
        page,
        children
    } = props;

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);

    const toggleMenu = React.useCallback(() => {
        setMenuIsOpen(!menuIsOpen);
    }, [menuIsOpen, setMenuIsOpen]);

    const resetMenu = React.useCallback(() => {
        setMenuIsOpen(false);
    }, [setMenuIsOpen]);

    return (
        <Router>
            <div id="AppContainer">
                {/* Nav */}
                <Nav.Component
                    title={title}
                    toggleMenu={_ => setMenuIsOpen(!menuIsOpen)}
                />

                {/* Page Body */}
                <div className="body">
                    <Routes.Index />
                    {children}
                </div>

                <p> Footer (tm)</p>

                {/* Side bar */}
                <SideBar.Component
                    menuIsOpen={menuIsOpen}
                    toggleMenu={toggleMenu}
                    resetMenu={resetMenu}
                />
            </div>
        </Router>
    );
};


export default AppContainer;
