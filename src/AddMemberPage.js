
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import firebase from './firebaseApp'
import 'firebase/firestore'

function AddMemberPageComp() {
  let history = useHistory();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');

  const addMember = () =>
  {
    let obj = {Name : name , Email :email, City:city};
      firebase.firestore().collection('Members').add(obj)
      .then(data=>
      {
  
         console.log('member created');  
      })   
  }

  return (
    <div style={{border:'2px solid',width:'300px',height:'auto',marginTop:'10px',padding:'3px'}} >
   
      <h3>Add New Member</h3>
      Name : <input type="text" onChange={e=>setName(e.target.value)}/> <br/>
      Email : <input type="text" onChange={e=>setEmail(e.target.value)}/> <br/>
      City : <input type="text" onChange={e=>setCity(e.target.value)}/> <br/><br/>
      <input style={{marginRight:'5px'}} type="button" value="save" onClick={addMember}/>
      <input type="button" value="cancel" onClick={e=>history.push("/mainPageMenu/subscriptionsPage/allMembersPage")}/>
  
    </div>
  );
}

export default AddMemberPageComp;
