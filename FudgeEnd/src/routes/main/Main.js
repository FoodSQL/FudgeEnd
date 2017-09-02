import React from 'react';
import Pantry from '../../components/Pantry';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Main.css';


class Main extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Pantry ingredients={this.props.ingredients} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Main);
