import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataContext } from './context';
import React from 'react';
import firebase from './firebaseApp';

function SubscriptionsWatchedComp(props) {
  let history = useHistory();
  const { moviesArr, subscriptonsArr, membersArr } =
    React.useContext(DataContext);
  const [subscriptons, setSubscriptions] = subscriptonsArr;
  const [movies, setMovies] = moviesArr;
  const [members, setMembers] = membersArr;
  const allMembers = '/mainPageMenu/subscriptionsPage/allMembersPage';

  let res = subscriptons.filter((s) => s.Movies.movieId == props.id);
  res.map((x) => {
    members.forEach((m) => {
      if (x.MemberId == m.Id) x.Name = m.Name;
    });
  });

  return (
    <div
      style={{
        border: '1px solid gray',
        height: 'auto',
        marginTop: '5px',
        padding: '5px',
        display: 'inline-block',
      }}
    >
      Subscriptions Watched
      <ul>
        {res.map((item) => {
          return (
            <li key={item.MemberId}>
              <Link to={`${allMembers}`}> {item.Name}</Link> ,{item.Movies.date}{' '}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SubscriptionsWatchedComp;
