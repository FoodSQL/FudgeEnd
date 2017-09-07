import React, { Component } from 'react';

class Navbar extends Component {

    logoout = () => {
        localStorage.removeItem('user');
        this.props.loggedOut();
    }


    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                <a href="#" className="brand-logo">FoodSQL</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>{this.props.user}</li>
                    <li><a onClick={this.logoout}>{ this.props.user == ''? 'FoodSQL' : 'Sign Out' }</a></li>
                </ul>
                </div>
            </nav>
        
        );
    }
}

export default Navbar;