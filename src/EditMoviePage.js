import { Route, Switch, useHistory,useRouteMatch } from "react-router";
import React, { useState } from 'react'
import {DataContext} from './context'
import firebase from './firebaseApp'
import 'firebase/firestore'


function EditMovieComp(props) {

let history=useHistory();
let id=props.match.params.id;
const {moviesArr } = React.useContext(DataContext);
const [movies,setMovies] = moviesArr;
let movie=movies.find(x=>x.Id==id)
const [name,setName] = useState('');
const [genres,setGenres] = useState('');
const [image,setImage] = useState('');
const [premired,setPremired] = useState('');

const update = () => {

  firebase.firestore().collection('Movies').doc(id)
  .set({Name:name,Genres:genres,Image:image,Premired:premired})
    .then(data=>
      {
        console.log('Updated');
      })

}

  return (
    <div >
      <h3>Edit Movie : {movie.Name} </h3>
      Name : <input type="text" onChange={e=>setName(e.target.value)}></input><br/>
      Genres : <input type="text" onChange={e=>setGenres(e.target.value)}></input><br/>
      Image Url : <input type="text" onChange={e=>setImage(e.target.value)}></input><br/>
      Premired : <input type="text" onChange={e=>setPremired(e.target.value)}></input><br/>
     <input type="button" value="update" onClick={update}></input>
     <input type="button" value="cancel" onClick={e=>history.push('/mainPageMenu/moviesPage/allMoviesPage')}></input>
    </div>
  );
}

export default EditMovieComp;
