/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import { createNewUser } from '../../actions/UserActions.js';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
    this.state = {email: ''};
    this.state = {password: ''};
    this.state = {password_confirmed: ''}

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }
  handleChangePasswordConfirmation(event) {
    if (event.target.value != this.state.password) {
      alert("Passwords don't match");
    }else {
      this.setState({password_confirmed: true});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    createNewUser(this.state.name,this.state.email,this.state.password);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (

      <div className={s.root}>
        <div className={s.container}>
          <strong className={s.lineThrough}>SIGN UP</strong>
          <form onSubmit={this.handleSubmit}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="name">
                Name:
              </label>
              <input
                className={s.input}
                id="name"
                type="text"
                name="name"
                onChange={this.handleChangeName}
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="email">
                Email address:
              </label>
              <input
                className={s.input}
                id="email"
                type="email"
                name="email"
                onChange={this.handleChangeEmail}
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                className={s.input}
                id="password"
                type="password"
                name="password"
                onChange={this.handleChangePassword}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="confirm_password">
                Confirm Password:
              </label>
              <input
                className={s.input}
                id="confirm_password"
                type="password"
                name="confirm_password"
              />
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
