import './App.css';
import React, {Component} from 'react'
import Register from './components/Register'
import Login from './components/Login'
import {BrowserRouter, Switch, Route} from 'react-router-dom'


class App extends Component{
  render() {
    return(
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
      </Switch>
      </BrowserRouter>
    )
  };
}

export default App;
