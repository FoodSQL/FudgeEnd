import React, { Component } from 'react';
import Pantry from './Pantry'
import RecipesWrapper from './RecipesWrapper'

class componentName extends Component {
    render() {
        return (
            <div className="row">
                <div className="col s12 m4 l2"></div>
                <div className="col s12 m4 l7"><RecipesWrapper/></div>
                <div className="col s12 m4 l3"><Pantry/></div>
            </div>
        );
    }
}

export default componentName;