import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import Subheader from 'material-ui/Subheader';

var user = null;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: false,
            err: '',
            err_email: '',
            err_name: '',
            err_password: '',
            dialogState: 'login',
            textFields: {
                name: '',
                email: '',
                password: '',
            },
        }
    }

    componentWillMount() {
        user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
            console.log(user.name)
            this.setState({
                ...this.state, textFields:
                {
                    ...this.state.textFields, name: user.name,
                    ...this.state.textFields, email: user.email
                }
            });
        }
    }

    handleTextChange = (event) => {
        this.setState({
            ...this.state, textFields:
            { ...this.state.textFields, [event.target.id]: event.target.value }
        }
        )
        this.setState({ err_name: '', err_email: '', err_password: '' })
    }

    handleOpen = () => {
        this.setState({ setting: true })
    }

    handleClose = () => {
        this.setState({ setting: false });
    }

    logoout = () => {
        localStorage.removeItem('user');
        this.props.loggedOut();
    }

    handleSettings = () => {
        this.setState({ setting: true });

    }

    handleUpdateSettings = () => {

    }

    render() {
        const actionsPantry = [
            <FlatButton
                label="Update"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleUpdateSettings}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Update your user info"
                    actions={actionsPantry}
                    modal={false}
                    open={this.state.setting}
                    onRequestClose={this.handleClose}>
                    <div className='dialogContainer'>
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
                        <Subheader>Fill up your password to confirm:</Subheader>
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
                </Dialog>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo center">FoodSQL</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {user === null ? null :
                                <div>
                                    <li>{user.name}</li>
                                    <li>
                                        <a onClick={this.handleSettings}>
                                            Settings
                                        </a>
                                    </li>
                                    <li><a onClick={this.logoout}>Sign Out</a></li>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

export default Navbar;