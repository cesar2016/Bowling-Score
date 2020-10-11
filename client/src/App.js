import React from 'react';

import './App.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Route} from 'react-router-dom';
// import NewClient from './components/CRUD/client';
import Header from './components/Nav/Nav'

function App() {
  return (
    <div className="App">
     
       {/*  <Route 
        exact 
        path='/clientRegister' component={NewClient} />
        <Link to="/clientRegister">
					<button> JOSESITO</button>
				</Link> */}
        <Route 
        path='/'
        component={Header}
        />
    </div>
  );
}

export default connect(null, null)(App);
