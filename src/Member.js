
import {Switch,Route,useHistory} from 'react-router-dom'
import firebase from './firebaseApp'
import 'firebase/firestore'
import {useEffect, useState} from 'react';
import {DataContext} from './context'
import React from 'react';
import MoviesWatchedComp from './MoviesWatched';



function MemberComp(props) {
  
  let history = useHistory();

  const {nameOfUser} = React.useContext(DataContext);
  const [name,setName] = nameOfUser;
  const [permissionArr,setPermission] = useState([]);
  const editMembers="/mainPageMenu/subscriptionsPage/editMember";

  let edit = permissionArr.includes('Update Subscription');
  let Delete= permissionArr.includes('Delete Subscriptions');
  let id=props.membersArr.Id;
  
  const editMember = () => {
    if(edit)
    {
  
      history.push(`${editMembers}/${id}`);
    }
  }
  const deleteMember = () => {

  
    firebase.firestore().collection('Members').doc(id).delete()
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
    <div style={{border:'2px solid',width:'350px',height:'auto',marginTop:'10px'}}>  

    <h3>{props.membersArr.Name}</h3>
     Email : {props.membersArr.Email} <br/>
     City : {props.membersArr.City} <br/>
     <input style={edit?{visibility:'visible',marginRight:'3px'}:{visibility:'hidden'}} type="button" value="Edit" onClick={editMember}></input>
     <input style={Delete?{visibility:'visible'}:{visibility:'hidden'}} type="button" value="Delete"
     onClick={deleteMember}></input>
    <MoviesWatchedComp id={id}/>
    </div>
    
  );
}

export default MemberComp;
