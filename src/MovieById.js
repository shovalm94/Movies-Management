
import {useHistory} from 'react-router-dom'
import  { useEffect, useState } from 'react';
import firebase from './firebaseApp'
import 'firebase/firestore'
import React from 'react'
import {DataContext} from './context'

function MovieByIdComp(props) {

  let history = useHistory();

  const {nameOfUser,moviesArr} = React.useContext(DataContext);
  const [name,setName] = nameOfUser;
  const [permissions,setPermission] = useState([]);
  const [movies,setMovies] = moviesArr;
  let movie=movies.filter(x=>x.Id==props.match.params.id);
  let d,year,genres,id,Name,image;
  movie.map(m=>{
    Name=m.Name;
    image=m.Image;
     d = m.Premiered;
     year = parseInt(d); 
     genres=m.Genres.toString(); 
     id=props.match.params.id;
  })




  
  let edit = permissions.includes('Update Movies');
  let Delete= permissions.includes('Delete Movies');


  const deleteMovie = () => {

      firebase.firestore().collection('/Movies').doc(id).delete()
        .then(data=>
          {
            console.log('Deleted');
          })
      
  } 
  useEffect(() => {

    firebase.firestore().collection('/Users').get().then(data=>{
      let usersPermission =[];
      data.forEach(user => {
          if(user.data().UserName== name)
          {
            usersPermission=user.data().Permission;
          }
      })
  
      setPermission(usersPermission);

    })  

  }, []);

  return (
    <div style={{border:'2px solid',width:'400px',height:'auto',marginTop:'10px'}}>  

        <b>{Name}, {year}</b><br/>
         Genres: {genres}<br/>
         <img style={{width:'50px',height:'auto',margin:'5px'}} src={image}/><br/>
      
          <input style={edit?{visibility:'visible'}:{visibility:'hidden'}} type="button" value="Edit" onClick={e=>history.push(`/mainPageMenu/moviesPage/editMoviesPage/${id}`)} ></input>  
          <input style={Delete?{visibility:'visible'}:{visibility:'hidden'}} type="button" value="Delete" onClick={deleteMovie}  ></input>
          

    </div>
  );
}

export default MovieByIdComp;
