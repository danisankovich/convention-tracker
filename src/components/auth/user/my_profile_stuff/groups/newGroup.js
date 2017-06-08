import React, { Component } from 'react';
import {connect} from 'react-redux';
import Datetime from 'react-datetime';
import * as actions from '../../../../../actions';
import { browserHistory } from 'react-router';
import {Link} from 'react-router';
import utils from '../../../../../utils.js';
import $ from 'jquery';
import _ from 'lodash';


class NewGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {groupUsers: {} }
  }
  componentWillMount() {
    this.props.fetchInfo();
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.state.userId = this.props.userInfo._id;
    this.state.username = this.props.userInfo.username;
    this.state.groupUsers = JSON.stringify(this.state.groupUsers)
    this.props.newGroup(this.state)
  }
  handleChange(type, e) {
    this.state[type] = e.target.value;
  }
  handleChangeDate(type, e) {
    this.state[type] = e._d;
  }

  addUser(e) {
    e.preventDefault();
    const groupUsers = this.state.groupUsers;
    $.ajax({
       url: `/api/checkUser`,
       type: "GET",
       data: {user: this.state.newUser}
    }).done((response) => {
      if (response && !groupUsers[response.id]) {
        groupUsers[response.id] = response.user;
        this.setState({groupUsers});
      } else if (!response) {
        alert('No User Found with that Username/Email')
      } else {
        alert('User already added')
      }
    });
  }

  render() {
    const {userInfo} = this.props
    const groupUsers = this.state.groupUsers || {};
    if (userInfo) {
      groupUsers[userInfo._id] = userInfo.username;
    }
    return (
      <div>
        {userInfo && <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
              <form onSubmit={this.handleFormSubmit.bind(this)}>
                <div className='col-sm-12'>
                  <div className='col-sm-6'>
                    <fieldset className="form-group">
                      <label>Group Name: </label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={this.handleChange.bind(this, 'name')}
                        />
                    </fieldset>
                  </div>
                  <div className='col-sm-6'>
                    <fieldset className="form-group">
                      <label>Group Affilliation: </label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={this.handleChange.bind(this, 'affiliation')}
                        />
                    </fieldset>
                  </div>
                </div>
                <div className='col-sm-12'>
                  <div className='col-sm-12'>
                    <ul>
                      {_.map(groupUsers, (user, key) => <li key={key}>{user}</li>)}
                    </ul>
                    <fieldset className="form-group">
                      <label>Invite Users (separate with commas): </label>
                      <input
                        placeholder="Username or Email"
                        className="form-control"
                        type="text"
                        onChange={this.handleChange.bind(this, 'newUser')}
                      />
                      <button type='button' onClick={this.addUser.bind(this)}>Add User</button>
                    </fieldset>
                  </div>
                </div>
                <div className='col-sm-12'>
                  <div className='col-sm-12'>
                    <fieldset className="form-group">
                      <label>Notes: </label>
                      <input
                        placeholder="Any Additional Notes? (ex. 21+, price, etc.). separate by commas"
                        className="form-control"
                        type="text"
                        onChange={this.handleChange.bind(this, 'notes')}
                        />
                    </fieldset>
                  </div>
                </div>
                <button action="submit" className="btn btn-primary">Add Event</button>
              </form>
            </div>
          </div>
        </div>
      }
      <div>
        {!userInfo && <h1>Loading....</h1>}
      </div>
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    userInfo: state.auth.userInfo
  };
}

export default connect(mapStateToProps, actions)(NewGroup);
