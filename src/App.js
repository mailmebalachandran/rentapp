import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/loginUser';
import DashBoard from './components/Dashboard/Dashboard';
import ManageUsers from './components/ManageUser/ManageUsers';
import ManageExpenses from './components/ManageExpense/ManageExpenses';
import Error from './components/common/Error';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

class App extends Component {
  render(){
  return (
    <div>
    <BrowserRouter>
      <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/Login" component={Login} exact />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/ManageUsers" component={ManageUsers} />
      <Route path="/ManageExpenses" component={ManageExpenses} />
      <Route component={Error} />
      </Switch>
    </BrowserRouter>
    </div>
  );
  }
}

export default App;
