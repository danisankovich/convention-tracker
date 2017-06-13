import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import Groups from './groups';

//WELCOMING PAGE
class Groups_Container extends Component {
  render() {
      return (
        <div className='row'>
          <Groups groupType={this.props.groupType}/>
        </div>
      );
  };
}

module.exports = Groups_Container
