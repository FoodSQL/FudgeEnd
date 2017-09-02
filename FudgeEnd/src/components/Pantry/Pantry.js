import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Griddle from 'griddle-react';


class Pantry extends React.Component {

  render() {
    return (
      <Griddle data={this.props.ingredients} />
    );
  }
}

export default (Pantry);
