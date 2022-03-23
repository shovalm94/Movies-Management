import { Route, Switch, useHistory,useRouteMatch } from "react-router";
import React, { useState } from 'react'
import {DataContext} from './context'
import firebase from './firebaseApp'
import 'firebase/firestore'


function EditUserPageComp(props) {

let history=useHistory();

const {usersArr } = React.useContext(DataContext);
const [users,setUsers] = usersArr;
const [fName,setFname] = useState('');
const [lName,setLname] = useState('');
const [userName,setUserName] = useState('');
const [session,setSession] = useState('');
const [checked,setChecked] = useState(false);
const [created,setCreated] = useState();

let id=props.match.params.id;
let user=users.find(x=>x.id===id)
let permissionArr=[];
let permissionArr2=[];
let finalArr=[];

const [checkedSubscriptions, setCheckedSubscriptions] = useState(false);
const [checkedMovies, setCheckedMovies] = useState(false);

const update = () => {

    let res1=permissionArr.includes('Create Subscriptions');
    let res2=permissionArr.includes('Delete Subscriptions');
    let res3=permissionArr.includes('Update Subscriptions');

    let res4=permissionArr2.includes('Create Movies');
    let res5=permissionArr2.includes('Delete Movies');
    let res6=permissionArr2.includes('Update Movies');

    if(res1&&res2&&res3)  
    {
     setCheckedSubscriptions(true)
     permissionArr.push('View Subscriptions');
    }
    if(res4&&res5&&res6)  
    {
     setCheckedMovies(true)
     permissionArr.push('View Movies');
    }
    finalArr= [...permissionArr, ...permissionArr2];
    
    firebase.firestore().collection('Users').doc(id)
        .set({FirstName : fName,LastName:lName,UserName:userName,SessionTimeOut:session,CreatedDate:created,Permission:finalArr})
          .then(data=>
          {
             console.log('Updated');
             
          })
        history.push(`/mainPageMenu/manageUserPage/allUserPage`)
  
}


  return (
    <div style={{border:'2px solid',width:'400px',height:'auto',marginTop:'10px'}} >
      <h3>Edit User : {user.firstName} </h3>
      First Name : <input type="text" onChange={e=>setFname(e.target.value)}/><br/>
      Last Name : <input type="text" onChange={e=>setLname(e.target.value)}/><br/>
      Created Date : <input type="text" onChange={e=>setCreated(e.target.value)}/><br/>
      User Name : <input type="text"onChange={e=>setUserName(e.target.value)}/><br/>
      Session Time Out (Minutes) : <input type="text" onChange={e=>setSession(e.target.value)}/><br/>
      Permissions : <br/>
      <input type="checkbox" className="checks" value="View Subscriptions" onChange={()=>setCheckedSubscriptions(!checkedSubscriptions)} checked={checkedSubscriptions}/>View Subscriptions<br/>
      <input type="checkbox" className="checks" value="Create Subscriptions" onChange={e=>permissionArr.push(e.target.value)}/>Create Subscriptions<br/>
      <input type="checkbox" className="checks" value="Delete Subscriptions" onChange={e=>permissionArr.push(e.target.value)}/>Delete Subscriptions<br/>
      <input type="checkbox" className="checks" value="Update Subscriptions" onChange={e=>permissionArr.push(e.target.value)}/>Update Subscriptions<br/>
      <input type="checkbox" className="checks" value="View Movies" onChange={()=>setCheckedMovies(!checkedMovies)} checked={checkedMovies}/>View Movies<br/>
      <input type="checkbox" className="checks" value="Create Movies"onChange={e=>permissionArr2.push(e.target.value)}/>Create Movies<br/>
      <input type="checkbox" className="checks" value="Delete Movies"onChange={e=>permissionArr2.push(e.target.value)}/>Delete Movies<br/>
      <input type="checkbox" className="checks" value="Update Movies"onChange={e=>permissionArr2.push(e.target.value)}/>Update Movies<br/>

    
      <input type="button" value="Update" onClick={update}/>
      <input type="button" value="Cancel" onClick={e=>history.push(`/mainPageMenu/manageUserPage/allUserPage`)}/> 
 
    </div>
  );
}

export default EditUserPageComp;
