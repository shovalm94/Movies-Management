
import {Switch,Route, useHistory} from 'react-router-dom'
import { useState,useEffect,useContext} from 'react';

import {DataContext} from './context'
import React from 'react';
import utils from './Utils'
import firebase from './firebaseApp'
import 'firebase/firestore'


function AddNewMovieComp(props) {


 let history = useHistory();
 

 const { moviesArr,subscriptonsArr} = React.useContext(DataContext);
 const [movies, setMovies] = moviesArr; 
 const [nameOfMovie,setName] = useState (movies[0].Name);
 const [movie,setMovie] = useState();


 const [subscriptons,setSubscriptions] = subscriptonsArr;
 let id=props.match.params.id;


 let date=new Date();
 let day = date.getDate();
 let month = date.getMonth()+1;
 let year = date.getFullYear();
 let dateString = day + '/' + month + '/' + year;

const save = (sel) => {

  movies.map(m=>{
    if(sel.target.value==m.Name)
    {
      setName(m.Name);
      setMovie(m.Id);
    }
  })
 
}
const saveData = () => {
  let obj = {
    MemberId: id, 
    Movies : 

      {
         movieId:movie,
         date:dateString
      }
  };


  firebase.firestore().collection('Subscriptions').add(obj)
  .then(data=>
  {

     console.log('subscriptions created');  
  })   
}
let movieArr=[];
let sub=subscriptons.filter(m=>m.MemberId==id);
let tempMovies = [...movies];
let index ;

sub.map(s=>{
  tempMovies.map(m=>{
     if(m.Id==s.Movies.movieId)
       {
        index= tempMovies.indexOf(m);  
       }
  })
  tempMovies.splice(index, 1);
})
movieArr=tempMovies;

  return (
    <div style={{border:'2px solid',width:'250px',height:'auto',margin:'5px'}}>
     Add a new movie<br/>
 
     <select style={{width:'130px'}} onChange={save} >
          {
          
                movieArr.map(item=>{
                  return (
                    <option key={item.Id} value={item.Name}>{item.Name}</option>
                    );
                })
                       
          }
          
    </select>
 
      
     
    <input style={{width:'90px',marginLeft:'10px'}} type="text" value={dateString}
      onChange={() => {}}/><br/> 
    <input type="button" value="Subscribe" onClick={saveData}/><br/><br/>
     


    </div>

  );
}

export default AddNewMovieComp;
