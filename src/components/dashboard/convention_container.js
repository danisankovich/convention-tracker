import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'
import $ from 'jquery';
import MyConventions from '../auth/user/my_profile_stuff/myConventions';

class ConventionContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='container'>
        <h3>My Conventions</h3>
        {this.props.userInfo && <div>
          <MyConventions userInfo={this.props.userInfo} pathInfo={this.props.pathInfo}/>
        </div>}
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
export default connect(mapStateToProps, actions)(ConventionContainer);
