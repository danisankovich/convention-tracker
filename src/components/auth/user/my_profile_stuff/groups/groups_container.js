import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import Groups from './groups';
import {Link} from 'react-router';

//WELCOMING PAGE
class Groups_Container extends Component {
  render() {
      return (
        <div className='row'>
          <Link to="/new"><button className="btn btn-success">Create Group</button></Link>

          <Groups />
        </div>
      );
  };
}

module.exports = Groups_Container
