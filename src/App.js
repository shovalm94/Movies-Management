import MainPageComp from './MainPage';
import utils from './Utils';
import { useEffect, useState } from 'react';
import { DataContext } from './context';
import React from 'react';
import { useRef } from 'react';
import firebase from './firebaseApp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <MainPageComp />
    </div>
  );
}

export default App;
