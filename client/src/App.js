import React from 'react';

import './App.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Route} from 'react-router-dom';
// import NewClient from './components/CRUD/client';
import Tablero from './components/Tablero'

function App() {
  return (
    <div className="App">     
       
        <Route 
        path='/'
        component={Tablero}
        />
    </div>
  );
}

export default connect(null, null)(App);
