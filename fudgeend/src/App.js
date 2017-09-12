import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Login from './components/Login'
import './css/materialize.css'
import './css/style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      logged : false
    }
  }

  componentWillMount() {
        this.loggedIn();
      }


  loggedIn = () => {
        var localStorageUser = localStorage.getItem('user')
        if(localStorageUser){
          var user = JSON.parse(localStorageUser)
          if(user){
            var loggedName = user.name
            this.setState({
              name : loggedName,
              logged: true,
            })
      }
    }
  }

  loggedOut = () => {
    this.setState({
      name : '',
      logged: false
    })
  }

  switchComponent = () => {
    switch(this.state.logged){
      case false:
        return <Login logged={this.loggedIn}/>
      default:
        return <Menu/>
    }
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div>
        <Navbar logged={this.state.logged} loggedOut={this.loggedOut}/>
        { this.switchComponent() }  
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
