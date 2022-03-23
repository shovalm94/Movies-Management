import { Switch, Route, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { DataContext } from './context';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import utils from './Utils';
import firebase from './firebaseApp';
import 'firebase/firestore';
import AllMoviesComp from './AllMoviesPage';
import AddMoviesComp from './AddMoviesPage';
import EditMovieComp from './EditMoviePage';
import MovieComp from './Movie';
import MovieByIdComp from './MovieById';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function MoviesComp() {
  const allMovies = '/mainPageMenu/moviesPage/allMoviesPage';
  const movie = '/mainPageMenu/moviesPage/movieById/:id';
  const addMovies = '/mainPageMenu/moviesPage/addMoviesPage';
  const editMovie = '/mainPageMenu/moviesPage/editMoviesPage/:id';
  let history = useHistory();

  const [fClick, setFClick] = useState(false);
  const { moviesArr, nameOfUser, findMovies, findFlag } =
    React.useContext(DataContext);
  const [movies, setMovies] = moviesArr;
  const [name, setName] = nameOfUser;
  const [permissionArr, setPermission] = useState([]);
  const [find, setFind] = findMovies;
  const [findF, setfindF] = findFlag;
  const classes = useStyles();

  const clickAllEvent = () => {
    let view = permissionArr.includes('View Movies');

    if (view) {
      history.push(`${allMovies}`);
      setFClick(false);
    }
  };
  const clickAddEvent = () => {
    let add = permissionArr.includes('Create Movies');

    if (add) {
      history.push(`${addMovies}`);
      setFClick(!fClick);
    }
  };
  const findMovie = () => {
    setfindF(true);
    let res = movies.filter((x) => x.Name == find);
    setMovies(res);
  };

  const loadMoviesData = async () => {
    let resp = await utils.getAllMovies();
    let movieArr = resp.data;

    movieArr.forEach((movie) => {
      let obj = {
        Name: movie.name,
        Genres: movie.genres,
        Image: movie.image.original,
        Premiered: movie.premiered,
      };
      firebase
        .firestore()
        .collection('/Movies')
        .add(obj)
        .then((data) => {
          console.log('Movie created !');
        });
    });
    firebase
      .firestore()
      .collection('/Movies')
      .get()
      .then((data) => {
        let movieArr = [];
        data.forEach((movie) => {
          let obj = {
            Id: movie.id,
            Name: movie.data().Name,
            Genres: movie.data().Genres,
            Image: movie.data().Image,
            Premiered: movie.data().Premiered,
          };
          movieArr.push(obj);
        });
        setMovies(movieArr);
      });
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection('/Movies')
      .get()
      .then((data) => {
        if (data.size == 0) {
          loadMoviesData();
        } else {
          let movieArr = [];
          data.forEach((movie) => {
            let obj = {
              Id: movie.id,
              Name: movie.data().Name,
              Genres: movie.data().Genres,
              Image: movie.data().Image,
              Premiered: movie.data().Premiered,
            };
            movieArr.push(obj);
          });
          setMovies(movieArr);
        }
      });

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
      style={{
        textAlign: 'center',
        margin: 'auto',
      }}
    >
      <h3>Movies</h3>

      <Button
        style={{ margin: '5px' }}
        variant='outlined'
        size='small'
        onClick={clickAllEvent}
      >
        All Movies
      </Button>

      <Button
        style={{ margin: '5px' }}
        variant='outlined'
        size='small'
        onClick={clickAddEvent}
      >
        Add Movies
      </Button>

      <label
        style={fClick ? { visibility: 'hidden' } : { visibility: 'visible' }}
      >
        {' '}
        Find Movie:{' '}
      </label>
      <input
        style={
          fClick
            ? { visibility: 'hidden' }
            : { visibility: 'visible', margin: '5px' }
        }
        type='text'
        onChange={(e) => setFind(e.target.value)}
      ></input>
      <input
        type='button'
        style={
          fClick
            ? { visibility: 'hidden' }
            : { visibility: 'visible', margin: '5px' }
        }
        value='Find'
        onClick={findMovie}
      />
      <br />
      <br />

      <Switch>
        <Route path={`${allMovies}`} component={AllMoviesComp} />
        <Route path={`${movie}`} component={MovieByIdComp} />
        <Route path={`${addMovies}`} component={AddMoviesComp} />
        <Route path={`${editMovie}`} component={EditMovieComp} />
      </Switch>
    </div>
  );
}

export default MoviesComp;
