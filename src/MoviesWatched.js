
import {Switch,Route,Link,useHistory} from 'react-router-dom'
import {DataContext} from './context'
import React, { useState,useEffect } from 'react';
import firebase from './firebaseApp'
import AddNewMovieComp from './AddNewMovie';


function MoviesWatchedComp(props) {


 const addNewMovieId = "/mainPageMenu/subscriptionsPage/allMembersPage/addNewMoviePage/:id";
 const addNewMovie = "/mainPageMenu/subscriptionsPage/allMembersPage/addNewMoviePage";
 const allMembers="/mainPageMenu/subscriptionsPage/allMembersPage";
 const movie="/mainPageMenu/moviesPage/movieById";

 let history = useHistory();


 const { moviesArr,membersArr,subscriptonsArr} = React.useContext(DataContext);
 const [movies, setMovies] = moviesArr; 
 const [members, setMembers] = membersArr;
 const [subscriptons,setSubscriptions] = subscriptonsArr;
 const [open, setOpen] = React.useState(false);
 let id=props.id;

const newMovie = () => {
setOpen(!open);
  history.push(`${addNewMovie}/${id}`)
}
let res=[];
movies.map(x=>
  {
    subscriptons.map(m=>{
      if(m.MemberId==props.id){
        if(x.Id==m.Movies.movieId){
            x.date=m.Movies.date;
            res.push(x);
        }
      }
    })
  })


 useEffect(() => {

  firebase.firestore().collection('/Subscriptions').get().then(data=>{
      let subArr=[];
      data.forEach(sub => {
      let obj = 
      {
        MemberId:sub.data().MemberId,
        Movies : 
        {
          movieId:sub.data().Movies.movieId,
          date:sub.data().Movies.date
        } 
        
      };
      subArr.push(obj);
     })
      setSubscriptions(subArr); 
  })
}, []);

  return (
    <div style={{border:'2px solid',width:'330px',height:'auto',margin:'5px'}}>
     <b>Movies Watched</b><br/>
     <input type="button" value="Subscribe on new movie" onClick={newMovie} />
     <ul>
       {
             res.map(m=>{
                return(
                  <li key={m.Id}>
                   <Link to={`${movie}/${m.Id}`}> {m.Name}</Link> ,  {m.date}
                  </li>
                  )
           }) 
       }
     </ul>
     {open ?(
      <Switch>
        <Route path={`${addNewMovieId}`} component={AddNewMovieComp } />
    
      </Switch>
     ):
     (
       ""
     )
     }       
    </div>

  );
}

export default MoviesWatchedComp;
