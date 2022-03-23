import React from 'react';
import {DataContext} from './context'
import UserComp from './User'
import {Switch, Route,useRouteMatch,useHistory} from 'react-router-dom'
import firebase from './firebaseApp'
import 'firebase/firestore'
import {useEffect} from 'react'



function AllUsersPageComp() {

  const {usersArr } = React.useContext(DataContext);
  const [users,setUsers] = usersArr;

  useEffect ( () => {
    firebase.firestore().collection('/Users').get().then(data=>{
      let tempUsers = [];
      data.forEach(user =>
       {
         let id=user.id;
         let firstName = user.data().FirstName;
         let lastName = user.data().LastName;
         let created=user.data().CreatedDate;
         let userName=user.data().UserName;
         let session=user.data().SessionTimeOut;
         let permission=user.data().Permission;
         let obj = {id,firstName, lastName,userName,created,session,permission };
         if(firstName!='Shoval')
             tempUsers.push(obj);
       })
       setUsers(tempUsers);
    })
  },[]);

  return (
    <div >

      {
          users.map((item,index) =>
            {
              return <UserComp users={item} key={index} />
              
            })      
      }
    
    </div>
  );
}

export default AllUsersPageComp;
