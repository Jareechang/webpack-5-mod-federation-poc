import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
    Link,
    Switch,
    Route
} from "react-router-dom";


function mapPathToTitle(path : string) : string {
    const mapping : {[key: string]: string} = {
        '/search': 'Search',
        '/': 'Home'
    };

    return mapping[path] || 'Home';
}

interface RouteConfiguration {
    /**
     * unique id for the rouet 
     * */
    name: string;
    /**
     * Display text 
     * */
    text: string;
    /**
     * path of the route 
     * */
    path: string;
    /**
     * component to render for the route
     * */
    component: React.ReactNode;
}

/*
 *
 *  Route Configuration 
 *
 * **/
const AppRouteConfigurations : RouteConfiguration[] = [
    {
        name: 'home',
        text: 'Home',
        path: '/',
        component: React.lazy(() => import('home/Content'))
    },
    {
        name: 'search',
        text: 'Search',
        path: '/search',
        component: React.lazy(() => import('search/Content'))
    }
];

/*
 *
 *
 *  Main route component 
 *
 *
 * **/
const Index = () => (
    <Switch>
        {AppRouteConfigurations.map((config) => {
            return (
                <Route path={config.path} exact>
                    <React.Suspense fallback="Loading...">
                        <config.component />
                    </React.Suspense>
                </Route>
            );
        })}
    </Switch>
);

/*
 *
 *
 *  Side bar link route component 
 *
 *
 * **/
const commonLinkStyles = {
    color: '#00000'
};

const SideBarLinks = () => (
    <List>
        {AppRouteConfigurations.map((config) => {
            return (
                <ListItem button>
                    <Link to={config.path} style={commonLinkStyles}>
                        <ListItemText primary={config.text} />
                    </Link>
                </ListItem>
            );
        })}
    </List>
);

export {
    // Components 
    Index,
    SideBarLinks,

    // Utils
    mapPathToTitle
};
