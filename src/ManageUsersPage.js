import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import EditUserPageComp from './EditUserPage'
import AllUsersPageComp from './AllUsersPage';
import AddUserPageComp from './AddUserPage';
import { Button } from '@material-ui/core';


function ManageUsersPageComp() {

  const editUser="/mainPageMenu/manageUserPage/editUserPage/:id";
  const allUsers="/mainPageMenu/manageUserPage/allUserPage";
  const addUsers = "/mainPageMenu/manageUserPage/addUserPage";
  let history=useHistory();

  return (
    <div style={{border:'2px solid',width:'600px',height:'auto',marginTop:'10px'}} >
      
      <h3>Users</h3>

      <Button style={{margin:'5px'}} variant="outlined" size='small' 
        onClick={e=>history.push(`${allUsers}`)}>All Users</Button>
      <Button  variant="outlined" size='small'  onClick={e=>history.push(`${addUsers}`)}
      >Add User</Button>

      <Switch>
        <Route path={`${allUsers}`} component={AllUsersPageComp} />
        <Route path={`${addUsers}`} component={AddUserPageComp} />
        <Route path={`${editUser}`} component={EditUserPageComp}/> 
      </Switch>   
      
    </div>
  );
}

export default ManageUsersPageComp;
