import { useState, useEffect, useContext } from 'react';
import utils from './Utils';
import firebase from './firebaseApp';
import 'firebase/firestore';
import { DataContext } from './context';
import { useHistory } from 'react-router-dom';
import { Switch, Link, Route } from 'react-router-dom';
import React from 'react';
import { Button, TextField, Card } from '@material-ui/core';

function LoginPageComp() {
  const { login, nameOfUser, admin } = React.useContext(DataContext);
  const [usersLogin, setUsersLogin] = login;
  const [name, setName] = nameOfUser;
  const [isAdmin, setIsAdmin] = admin;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isExist, setIsExist] = useState(true);

  let history = useHistory();
  useEffect(() => {
    async function loadUsersData() {
      firebase
        .firestore()
        .collection('/UsersLogin')
        .get()
        .then((data) => {
          let tempUsers = [];
          data.forEach((user) => {
            let id = user.id;
            let userName = user.data().UserName;
            let password = user.data().Password;
            let obj = { id, userName, password };
            tempUsers.push(obj);
          });
          setUsersLogin(tempUsers);
        });
    }
    loadUsersData();
  }, []);

  const checkUserExist = () => {
    usersLogin.map((x) => {
      if (userName === x.userName && password === x.password) {
        setIsExist(true);
        history.push('/mainPageMenu');
        if (x.userName === 'Shoval') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setName(x.userName);
      } else {
        setIsExist(false);
      }
    });
  };

  return (
    <div>
      <Card
        style={{
          width: '30%',
          marginTop: '60px',
          marginLeft: '35%',
          padding: '5px',
          background: 'border-box',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Login </h2>

        <TextField
          required
          id='standard-required'
          label='User Name:'
          color='primary'
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
          onClick={checkUserExist}
        >
          Login
        </button>

        <br />
        <br />

        <label> New User ? </label>
        <Link to='/createAccountPage'> Create Account</Link>
        {!isExist ? <h3 style={{ color: 'red' }}>user not exist!</h3> : ''}
      </Card>
    </div>
  );
}

export default LoginPageComp;
