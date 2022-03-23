
import {useEffect} from 'react'
import firebase from './firebaseApp'
import 'firebase/firestore'
import {DataContext} from './context'
import React from 'react';
import MemberComp from './Member'





function AllMembersComp() {
  const { membersArr} = React.useContext(DataContext);
  const [members, setMembers] = membersArr;

    
  useEffect(() => {
    firebase.firestore().collection('/Members').get().then(data=>{
  
              let memberArr=[];
              data.forEach(member => {
              let obj = 
              {
                Id:member.id,
                Name:member.data().Name,
                Email:member.data().Email,
                City:member.data().City,
           
              };
              memberArr.push(obj);
             })
           
             setMembers(memberArr); 
         
    })


  }, []);
  return (
    <div >
       {
          members.map((item,index) =>
            {
              return <MemberComp membersArr={item} key={index} />
              
            })     
             
       }
     
     
    </div>
  );
}

export default AllMembersComp;
