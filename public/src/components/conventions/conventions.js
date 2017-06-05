import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';
import _ from 'lodash';

class Convention extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Here toooooo</h1>
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {conventions: state.convention.conventions};
}
export default connect(mapStateToProps, actions)(Convention);
