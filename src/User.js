
import {useHistory} from 'react-router-dom'
import firebase from './firebaseApp'
import 'firebase/firestore'

function UserComp(props) {

  let history = useHistory();
  let id=props.users.id;
  const editUser="/mainPageMenu/manageUserPage/editUserPage";

  const deleteUser = () => {
  firebase.firestore().collection('Users').doc(id).delete()
    .then(data=>
      {
        console.log('Deleted');
      })
  }

  return (
    <div style={{border:'2px solid',width:'300px',height:'auto',marginTop:'10px'}}>  

          Name : {props.users.firstName} {props.users.lastName}<br/>
          User Name : {props.users.userName} <br/>
          Session time out (Minutes) : {props.users.session} <br/>
          Created data : {props.users.created}<br/>
          Permissions : { props.users.permission + ' '}<br/>
          <input type="button" value="Edit" onClick={e=>history.push(`${editUser}/${id}`)}></input>  
          <input type="button" value="Delete" onClick={deleteUser}></input>
    </div>
  );
}

export default UserComp;
