import React, { Component } from 'react';
import Pantry from './Pantry'
import RecipesWrapper from './RecipesWrapper'
import Preloader from './Preloader'

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {
        const { loading } = this.state.loading;
        
        if(loading) {
            return <Preloader/>; // render null when app is not ready
          }else{
            return (
                <div className="row">
                    <div className="col s12 m4 l2"></div>
                    <div className="col s12 m4 l7"><RecipesWrapper/></div>
                    <div className="col s12 m4 l3"><Pantry/></div>
                </div>
            );
        }
    }
}

export default componentName;