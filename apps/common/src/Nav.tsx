import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MuiLink from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import {
  AccountStore,
  getHistory,
  emitter
} from 'app/SharedGlobals';

import {
  MemoryRouter as Router,
  Link
} from 'react-router-dom';

import { createMemoryHistory } from 'history';

const history = {
  global: getHistory(),
  local: createMemoryHistory()
}

import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    toolbar: {
      backgroundColor: '#dba3ad' 
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      '&&': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      }
    },
    links: {
      color: theme.palette.common.white,
      cursor: 'hand',
      padding: `${theme.spacing(0, 2)}`,
      textDecoration: 'none'
    }
  }),
);

interface SearchProps {
  isLoggedIn: boolean;
}

export default function Search(props: SearchProps) {
  const {
    isLoggedIn = false
  } = props;
  const classes = useStyles();
  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');

  React.useEffect(() => {
    history.local.listen((location) => {
      const { pathname, search } = location;
      history.global.push({
        pathname,
        search
      });
    });
  }, [history.local]);

  const navigate = React.useCallback((path) => {
      history.local.push(path);
  }, [history.local]);

  const handleLogout = (e) => {
    AccountStore.setIsLoggedIn(false);
    navigate('/');
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      history.local.push({
        pathname: '/search',
        search: `q=${searchText}` 
      });
      setSearchText('');
    }
  }

  return (
    <Router history={history.local}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="#" onClick={_ => navigate('/')} className={classes.links}>
                Kittygram 
              </Link>
            </Typography>

            <Typography variant="body1" noWrap>
              <Link to="#" onClick={_ => navigate('/account/profile')} className={classes.links}>
                Profile
              </Link>
            </Typography>

            <Typography variant="body1" noWrap>
              {isLoggedIn ? (
                <Link to="#" onClick={handleLogout} className={classes.links}>
                  Logout
                </Link>

              ) : (
                <Link to="#" onClick={_ => navigate('/account/login')} className={classes.links}>
                  Login
                </Link>
              )}
              
            </Typography>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={e => handleSearch(e)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </Router>
  );
}
