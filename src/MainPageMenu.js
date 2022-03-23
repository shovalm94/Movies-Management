import React from 'react';
import { DataContext } from './context';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import MoviesComp from './MoviesPage';
import SubscriptionsPageComp from './SubscriptionsPage';
import ManageUsersPageComp from './ManageUsersPage';
import { makeStyles } from '@material-ui/core/styles';

import Button from 'react-bootstrap/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function MainPageMenuComp() {
  const { nameOfUser, admin } = React.useContext(DataContext);
  const [name, setName] = nameOfUser;
  const [isAdmin, setIsAdmin] = admin;

  let { path, url } = useRouteMatch();
  let history = useHistory();

  const classes = useStyles();

  return (
    <div style={{ padding: '20px' }}>
      <div
        class='btn-group'
        role='group'
        style={{ background: '#fdffcd', borderRadius: '5px' }}
      >
        <button
          type='button'
          class='btn btn-lg'
          style={{ border: '1px solid gray' }}
          onClick={(e) => history.push(`${url}/moviesPage`)}
        >
          Movies
        </button>
        <button
          type='button'
          class='btn btn-lg '
          style={{ border: '1px solid gray' }}
          onClick={(e) => history.push(`${url}/subscriptionsPage`)}
        >
          Subscriptions
        </button>
        {isAdmin ? (
          <button
            type='button'
            class='btn btn-lg'
            style={{ border: '1px solid gray' }}
            onClick={(e) => history.push(`${url}/manageUserPage`)}
          >
            Users Management
          </button>
        ) : (
          ''
        )}
        <button
          type='button'
          class='btn btn-lg'
          style={{ border: '1px solid gray' }}
          onClick={(e) => history.push('/')}
        >
          Logout
        </button>
      </div>

      <Switch>
        <Route path={`${path}/moviesPage`} component={MoviesComp} />
        <Route
          path={`${path}/subscriptionsPage`}
          component={SubscriptionsPageComp}
        />
        <Route
          path={`${path}/manageUserPage`}
          component={ManageUsersPageComp}
        />
      </Switch>
    </div>
  );
}

export default MainPageMenuComp;
