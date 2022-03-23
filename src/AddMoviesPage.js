import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from './firebaseApp';
import 'firebase/firestore';
import { DataContext } from './context';
import React from 'react';
import { Button, TextField, Card } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { height, textAlign } from '@mui/system';

function AddMoviesComp() {
  let history = useHistory();
  const [Name, setName] = useState('');
  const [Genres, setGenres] = useState('');
  const [Image, setImage] = useState('');
  const [Premired, setPremired] = useState('');

  const addMovie = () => {
    let obj = { Name: Name, Genres: Genres, Image: Image, Premired: Premired };
    firebase
      .firestore()
      .collection('Movies')
      .add(obj)
      .then((data) => {
        console.log('movie created');
      });
  };

  return (
    <div
      style={{
        width: '20%',
        textAlign: 'left',
        margin: 'auto',
      }}
    >
      <TextField
        style={{ margin: '7px' }}
        size='small'
        variant='filled'
        color='success'
        id='outlined-basic'
        label='Name'
        type='text'
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <TextField
        style={{ margin: '7px' }}
        size='small'
        variant='filled'
        color='success'
        id='outlined-basic'
        label='Genres'
        type='text'
        onChange={(e) => setGenres(e.target.value)}
      />
      <br />
      <TextField
        style={{ margin: '7px' }}
        size='small'
        id='outlined-basic'
        label=' Image Url'
        type='text'
        variant='filled'
        color='success'
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      <TextField
        style={{ margin: '7px' }}
        size='small'
        variant='filled'
        color='success'
        id='outlined-basic'
        label='Premired'
        type='text'
        onChange={(e) => setPremired(e.target.value)}
      />

      <br />
      <input type='button' value='save' onClick={addMovie}></input>
      <input
        type='button'
        value='cancel'
        onClick={(e) => history.push('/mainPageMenu/moviesPage/allMoviesPage')}
      ></input>
    </div>
  );
}

export default AddMoviesComp;
