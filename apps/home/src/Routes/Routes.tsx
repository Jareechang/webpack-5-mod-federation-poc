import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
    Link,
    Switch,
    Route
} from "react-router-dom";

import { Loading } from '../components';

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
        name: 'search',
        text: 'Search',
        path: '/search',
        component: React.lazy(() => import('../pages/SearchResults'))
    },
    {
        name: 'account',
        text: 'Account',
        path: '/account',
        component: React.lazy(() => import('../pages/Account'))
    },
    {
        name: 'home',
        text: 'Home',
        path: '/',
        component: React.lazy(() => import('../pages/Home'))
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
  <React.Suspense fallback={<Loading />}>
    <Switch>
      {AppRouteConfigurations.map((config) => {
        return (
          <Route key={config.text} path={config.path}>
            <config.component />
          </Route>
        );
      })}
    </Switch>
  </React.Suspense>
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
