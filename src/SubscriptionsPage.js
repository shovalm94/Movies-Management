import { Button } from '@material-ui/core';
import {Switch,Route,useRouteMatch,useHistory} from 'react-router-dom'
import AllMembersComp from './AllMembersPage';
import AddMembersComp from './AddMemberPage';
import EditMemberComp from './EditMemberPage';
import utils from './Utils';
import {useEffect, useState} from 'react';
import {DataContext} from './context'
import React from 'react';
import firebase from './firebaseApp'




function SubscriptionsPageComp() {

  let history = useHistory();
  const allMembers="/mainPageMenu/subscriptionsPage/allMembersPage";
  const addMembers = "/mainPageMenu/subscriptionsPage/addMembersPage";
  const editMembers="/mainPageMenu/subscriptionsPage/editMember/:id";
  const { membersArr,nameOfUser} = React.useContext(DataContext);
  const [members, setMembers] = membersArr;
  const [name,setName] = nameOfUser;
  const [permissionArr,setPermission] = useState([]);
  let add = permissionArr.includes('Create Subscriptions');
  let all = permissionArr.includes('View Subscriptions');


  const loadMembersData = async () => {
    let resp = await utils.getAllMembers();
    let memberArr=resp.data;
    memberArr.forEach(member => {
    let obj={Name:member.name,Email:member.email,City:member.address.city};
    firebase.firestore().collection('Members').add(obj)
    .then(data=>
      {
        console.log('Member created ! ');  
        setMembers(memberArr);
      })
   
    })  
  }
  const addMember = () => {
    if(add)
    {
      history.push(`${addMembers}`);
    }
  }
  const allMember = () => {
    if(all)
    {
      history.push(`${allMembers}`);
    }
  }
  useEffect(() => {
    firebase.firestore().collection('/Members').get().then(data=>{
      if(data.size==0)
       {
         loadMembersData();
       }
       else{
        let memberArr=[];
        data.forEach(member => {
        let obj = 
        {
          Name:member.data().Name,
          Email:member.data().Email,
          City:member.data().City
        };
        memberArr.push(obj);
       })
     
       setMembers(memberArr); 
      }
      })

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
    <div style={{border:'2px solid',width:'600px',height:'auto',marginTop:'5px'}}>
      <h3>Subscriptions</h3>
      <Button style={{margin:'5px'}} variant="outlined" size='small'
       onClick={allMember}>All Memebers</Button>
      <Button  variant="outlined" size='small' onClick={addMember}
      >Add Member</Button>
      <Switch>
        <Route path={`${allMembers}`} component={AllMembersComp} />
        <Route path={`${addMembers}`} component={AddMembersComp} />
        <Route path={`${editMembers}`} component={EditMemberComp} />     
      
   
     
      </Switch>
 
  
    </div>
  );
}

export default SubscriptionsPageComp;
