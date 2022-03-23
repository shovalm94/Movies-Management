import React from 'react'
import {useState, useContext} from 'react'
import firebase from './firebaseApp'
import 'firebase/firestore'
import {DataContext} from './context'
import { Button,TextField } from '@material-ui/core';
import { useHistory } from 'react-router'


function EditMemberComp(props) {
  const { membersArr} = React.useContext(DataContext);
  const [members, setMembers] = membersArr;
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');

  let history=useHistory();


  let id=props.match.params.id;
  let member=members.find(x=>x.Id===id)

  const update = () => {
    firebase.firestore().collection('Members').doc(id)
    .set({Name : name,Email:email,City:city})
      .then(data=>
      {
         console.log('Updated');
         
      })
  }
  return (
    <div style={{border:'2px solid',width:'300px',height:'auto',marginTop:'10px'}} >
      <h4>Edit Member : {member.Name} </h4>
      Name : <input type="text" onChange={e=>setName(e.target.value)} /><br/>
      Email :  <input type="text" onChange={e=>setEmail(e.target.value)}/> <br/>
      City : <input type="text" onChange={e=>setCity(e.target.value)} /><br/><br/>
      <input style={{marginRight:'3px'}} type="button" value="update" onClick={update}/>
      <input type="button" value="cancel" onClick={e=>history.push("/mainPageMenu/subscriptionsPage/allMembersPage")}/>
    </div>
  );
}

export default EditMemberComp;
