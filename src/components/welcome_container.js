import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../actions';
import ConventionContainer from './dashboard/convention_container';

class Welcome_Container extends Component {
  componentDidMount() {
    this.props.fetchInfo();
  }
  render() {
    return (
      <div>
        <ConventionContainer userInfo={this.props.userInfo} pathInfo={this.props.location} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.auth.userInfo
  };
}
export default connect(mapStateToProps, actions)(Welcome_Container);
