
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import firebase from './firebaseApp'
import 'firebase/firestore'

function AddUserPageComp() {
  let history = useHistory();

  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [userName,setUserName] = useState('');
  const [session,setSession] = useState('');
  const [created,setCreated] = useState('');
  const [checkedSubscriptions, setCheckedSubscriptions] = useState(false);
  const [checkedMovies, setCheckedMovies] = useState(false);
  let permissionArr=[];
  let permissionArr2=[];
  let finalArr=[];

  const save = () => {

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

    let obj = {FirstName : fname , LastName : lname, UserName:userName,
               SessionTimeOut:session,CreatedDate:created,Permission:finalArr};
    
    
    firebase.firestore().collection('Users').add(obj)
    .then(data=>
      {
        console.log('user created');
      })
  }

  return (
    <div  >
   
      <h3>Add New User</h3>
      First Name : <input type="text" onChange={e=>setFname(e.target.value)}/><br/>
      Last Name : <input type="text" onChange={e=>setLname(e.target.value)}/><br/>
      User Name : <input type="text" onChange={e=>setUserName(e.target.value)}/><br/>
      Session Time Out (Minutes) : <input type="text" onChange={e=>setSession(e.target.value)}/><br/>
      Created Date : <input type="text" onChange={e=>setCreated(e.target.value)}/><br/>
      Permissions : <br/>
      <input type="checkbox" className="checks" value="View Subscriptions" onChange={()=>setCheckedSubscriptions(!checkedSubscriptions)} checked={checkedSubscriptions}/>View Subscriptions<br/>
      <input type="checkbox" className="checks" value="Create Subscriptions" onChange={e=>permissionArr.push(e.target.value)}/>Create Subscriptions<br/>
      <input type="checkbox" className="checks" value="Delete Subscriptions" onChange={e=>permissionArr.push(e.target.value)}/>Delete Subscriptions<br/>
      <input type="checkbox" className="checks" value="Update Subscriptions" onChange={e=>permissionArr.push(e.target.value)}/>Update Subscriptions<br/>
      <input type="checkbox" className="checks" value="View Movies" onChange={()=>setCheckedMovies(!checkedMovies)} checked={checkedMovies}/>View Movies<br/>
      <input type="checkbox" className="checks" value="Create Movies"onChange={e=>permissionArr2.push(e.target.value)}/>Create Movies<br/>
      <input type="checkbox" className="checks" value="Delete Movies"onChange={e=>permissionArr2.push(e.target.value)}/>Delete Movies<br/>
      <input type="checkbox" className="checks" value="Update Movies"onChange={e=>permissionArr2.push(e.target.value)}/>Update Movies<br/>

      <input type="button" value="Save" onClick={save}/>
      <input type="button" value="Cancel" onClick={e=>history.push('/mainPageMenu')}/> 
 
    </div>
  );
}

export default AddUserPageComp;
