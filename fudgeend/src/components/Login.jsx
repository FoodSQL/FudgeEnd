import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import auth from '../actions/auth.js'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: null,
      loading: null,
      err: '',
      err_email: '',
      err_name: '',
      err_password: '',
      dialogState: 'login',
      textFields: {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      },
    };
  }

  componentWillMount() {
    auth.getSavedUser((user) => {
      this.setState({ auth: user })
    })
  }

  handleTextChange = (event) => {
    this.setState({
      ...this.state, textFields:
      { ...this.state.textFields, [event.target.id]: event.target.value }
    }
    )
    this.setState({ err_name: '', err_email: '', err_password: '' })
  }

  handleLogin = () => {
    auth.login(this.state.textFields.email, this.state.textFields.password, (result) => {
      if (result.status === 200) {
        this.props.logged();
      } else {
        alert('User not found');
      }
    })
  }

  handleRegister = () => {
    let err_found = false;
    if (this.state.textFields.email.length === 0) {
      this.setState({ err_email: 'Empty field' });
      err_found = true;
    } if (this.state.textFields.name.length === 0) {
      this.setState({ err_name: 'Empty field' });
      err_found = true;
    }
    if (err_found) {
      return;
    }
    auth.register(this.state.textFields.email, this.state.textFields.name, this.state.textFields.password, (result) => {
      if (result.status === 200) {
        this.props.logged();
      } else {
        alert('User already exists');
      }
    });
  }

  switchDialogContent = () => {
    if (this.state.dialogState === 'login') {
      this.setState({ dialogState: 'register' })
    } else {
      this.setState({ dialogState: 'login' })
    }
  }

  render() {
    if (this.state.dialogState === 'register') {
      return (
        <div className='card-login'>
          <Card>
            <CardTitle title="Register" subtitle="Enter our platform" />
            <div className="login-input">
              <TextField
                fullWidth
                id="name"
                floatingLabelText="Name"
                type="text"
                value={this.state.textFields.name}
                onChange={this.handleTextChange}
                errorText={this.state.err_name.length !== 0 ? "* Please fill up your name" : null}
              />
              <TextField
                fullWidth
                id="email"
                floatingLabelText="Email"
                type="email"
                value={this.state.textFields.email}
                errorText={this.state.err_email.length !== 0 ? "* Please fill up your email" : null}
                onChange={this.handleTextChange}
              />
              <TextField
                fullWidth
                id="password"
                floatingLabelText="Password"
                type="password"
                value={this.state.textFields.password}
                onChange={this.handleTextChange}
                errorText={this.state.textFields.password.length < 6 && this.state.textFields.password.length > 1 ? "Password too short" : null}
              />
              <TextField
                fullWidth
                id="confirm_password"
                floatingLabelText="Confirm Password"
                type="password"
                value={this.state.textFields.confirm_password}
                onChange={this.handleTextChange}
                errorText={this.state.textFields.password !== this.state.textFields.confirm_password && this.state.textFields.confirm_password.length > 1 ? "Passwords don't match" : null}
              />
            </div>
            <CardActions>]
                <RaisedButton
                label="REGISTER"
                primary={true}
                onClick={this.handleRegister} />
              <FlatButton
                label="Already Have an account?"
                onClick={this.switchDialogContent}
              />
            </CardActions>
          </Card>
        </div>
      );
    } else {
      return (
        <div className='card-login'>
          <Card>
            <CardTitle title="Login" subtitle="Enter our platform" />
            <div className="login-input">
              <TextField
                fullWidth
                id="email"
                floatingLabelText="Email"
                type="email"
                value={this.state.textFields.email}
                onChange={this.handleTextChange}
              />
              <TextField
                fullWidth
                id="password"
                floatingLabelText="Password"
                type="password"
                value={this.state.textFields.password}
                onChange={this.handleTextChange}
                errorText={this.state.textFields.password.length < 6 && this.state.textFields.password.length > 1 ? "Password too short" : null}
              />
            </div>
            <CardActions>
              <RaisedButton
                label="LOGIN"
                primary={true}
                onClick={this.handleLogin} />
              <FlatButton
                label="REGISTER"
                onClick={this.switchDialogContent}
              />
            </CardActions>
          </Card>
        </div>
      )
    }
  }
}

export default Login;