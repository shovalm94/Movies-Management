import { DataContext } from './context';
import { useEffect, useState } from 'react';
import { Button, TextField, Card } from '@material-ui/core';
import firebase from './firebaseApp';
import 'firebase/firestore';
import React from 'react';
import MovieComp from './Movie';

function AllMoviesComp() {
  const { moviesArr } = React.useContext(DataContext);
  const [movies, setMovies] = moviesArr;
  const [members, setMembers] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      {movies.map((item, index) => {
        return <MovieComp movies={item} key={index} />;
      })}
    </div>
  );
}

export default AllMoviesComp;
