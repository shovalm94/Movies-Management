import React from 'react';
import { useState, useContext } from 'react';
import firebase from './firebaseApp';
import 'firebase/firestore';
import { DataContext } from './context';
import { Button, TextField, Card } from '@material-ui/core';
import { useHistory } from 'react-router';

function CreateAccountComp() {
  const { login } = React.useContext(DataContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [usersLogin, setUsersLogin] = login;
  const [msgF, setMsgFlag] = useState(false);
  let history = useHistory();

  const checkUser = () => {
    const result = usersLogin.find((user) => user.userName === userName);
    if (result) {
      firebase
        .firestore()
        .collection('UsersLogin/')
        .doc(result.id)
        .set({ UserName: userName, Password: password })
        .then((data) => {
          history.push('/');
        });
    } else {
      setMsgFlag(true);
    }
  };
  return (
    <div>
      <Card
        style={{
          width: '30%',
          marginTop: '40px',
          marginLeft: '35%',
          padding: '5px',
          background: 'border-box',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>Create an Account</h3>
        <TextField
          required
          id='standard-required'
          label='User Name:'
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <TextField
          required
          id='standard-required'
          label='Password:'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <button
          type='button'
          class='btn btn-outline-success'
          onClick={checkUser}
          style={{ marginRight: '5px' }}
        >
          Create
        </button>
        <button
          type='button'
          class='btn btn-outline-success'
          onClick={(e) => history.push('/')}
        >
          Back
        </button>

        {msgF ? <h3 style={{ color: 'red' }}>userName not exist!</h3> : ''}
      </Card>
    </div>
  );
}

export default CreateAccountComp;
