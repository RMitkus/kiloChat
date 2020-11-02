import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './views/Login/Login';
import Chat from './views/Chat/Chat';
import Profile from './views/Profile/Profile';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => (
  <Router>
    <Header />
    <Route path="/" exact component={Login} />
    <PrivateRoute component={Chat} path="/chat" />
    <PrivateRoute component={Profile} path="/profile" />
    <ToastContainer />
  </Router>
);

export default App;
