import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from './firebaseApp';
import 'firebase/firestore';
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { DataContext } from './context';
import SubscriptionsWatchedComp from './SubscriptionsWatched';

function MovieComp(props) {
  let history = useHistory();
  var d = props.movies.Premiered;
  var year = parseInt(d);
  let genres = props.movies.Genres.toString();
  let id = props.movies.Id;
  const { nameOfUser } = React.useContext(DataContext);
  const [name, setName] = nameOfUser;
  const [permissions, setPermission] = useState([]);

  let edit = permissions.includes('Update Movies');
  let Delete = permissions.includes('Delete Movies');

  const deleteMovie = () => {
    firebase
      .firestore()
      .collection('/Movies')
      .doc(id)
      .delete()
      .then((data) => {
        console.log('Deleted');
      });
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection('/Users')
      .get()
      .then((data) => {
        let usersPermission = [];
        data.forEach((user) => {
          if (user.data().UserName == name) {
            usersPermission = user.data().Permission;
          }
        });

        setPermission(usersPermission);
      });
  }, []);

  return (
    <div
      className='card '
      style={{
        backgroundColor: 'transparent',
        width: '18rem',
        margin: '3px',
        display: 'inline-block',
        verticalAlign: 'top',
      }}
    >
      <img class='card-img-top' src={props.movies.Image} />
      <div class='card-body'>
        <h5 class='card-title'>
          {props.movies.Name}, {year}
        </h5>
        <p class='card-text'>
          <SubscriptionsWatchedComp id={props.movies.Id} />
        </p>
        <div class='card-footer bg-transparent border-info'>
          Genres: {genres}
          <br />
          <br />
          <input
            style={
              edit
                ? { visibility: 'visible', float: 'left', margin: '10px' }
                : { visibility: 'hidden', float: 'left', margin: '10px' }
            }
            type='button'
            value='Edit'
            onClick={(e) =>
              history.push(`/mainPageMenu/moviesPage/editMoviesPage/${id}`)
            }
          ></input>
          <input
            style={
              Delete
                ? { visibility: 'visible', margin: '10px', float: 'right' }
                : { visibility: 'hidden', margin: '10px', float: 'right' }
            }
            type='button'
            value='Delete'
            onClick={deleteMovie}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default MovieComp;
