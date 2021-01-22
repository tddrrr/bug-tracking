import './App.css';
import React, { Component } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import ViewProjects from './components/ViewProjects'
import ViewBugs from './components/ViewBugs'
import AddBug from './components/AddBug'
import ViewTeams from './components/ViewTeams'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props)
    // axios.defaults.headers.common['Authorization'] = `Bearer `+ res.data.token // for all requests

    
    this.isLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}` // for all requests
        return true;
      } else {
        return false;
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/" exact render= {() => {
            if (this.isLoggedIn()) {
              return (<Redirect to="/dashboard"></Redirect>)}
            else {
              return (<Login />)}} 
            }/>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/dashboard" exact render= {() => {
            if (this.isLoggedIn()) {
              return (<Dashboard />)}
            else {
              return (<Redirect to="/" />)}} 
            }/>   
          <Route path="/dashboard/getAllProjects" exact render= {() => {
            if (this.isLoggedIn()) {
              return (<ViewProjects />)}
            else {
              return (<Redirect to="/" />)}} 
            }/>   
            <Route path="/dashboard/project/:id/bugs" exact render= {() => {
            if (this.isLoggedIn()) {
              return (<ViewBugs />)}
            else {
              return (<Redirect to="/" />)}} 
            }/>  
            <Route path="/dashboard/project/:id/add" exact render= {() => {
            if (this.isLoggedIn()) {
              return (<AddBug />)}
            else {
              return (<Redirect to="/" />)}} 
            }/> 
            <Route path="/dashboard/teams" exact render= {() => {
            if (this.isLoggedIn()) {
              return (<ViewTeams />)}
            else {
              return (<Redirect to="/" />)}} 
            }/>  
        </Switch>
      </BrowserRouter>
    )
  };
}

export default App;