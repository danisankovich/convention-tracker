import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import utils from '../../../../../utils'
import { browserHistory } from 'react-router'
import $ from 'jquery';

import GroupConventions from './group_conventions'

class SingleGroup extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.setState({ inputValue: ''});
  }
  componentDidMount() {
    let id = this.props.location.pathname.split('groups/')[1]

    this.props.fetchGroup(id);
    this.props.fetchInfo();

  }
  handleClick(type) {
    if(this.props.userInfo._id = this.props.data.group.creatorId) {
      this.setState(type);
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let group = this.props.data.group
    group.type = this.state.type

    this.props.editGroup({group}, this.props.userInfo._id)
    this.setState({editAddress: false, editPrice: false})
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/conventions/${clickResult}`);
  }
  joinGroup() {
    const user = this.props.userInfo;
    const group = this.props.data.group;

    if (user.groups.indexOf(group._id) === -1) {
      this.props.userInfo.groups.push(group._id);

      this.props.joiningGroup(group._id);
      this.props.fetchGroup(group._id);
      this.state.memberList.push(user._id);
      this.state.members.push({_id: user._id, username: user.username});

      this.state.isMember = true;
    }
  }
  leaveGroup() {
    const groupId = this.props.data.group._id;
    const userId = this.props.userInfo._id;
    this.props.leavingGroup(groupId);
    this.props.fetchGroup(groupId);
    const userIndex = this.state.memberList.indexOf(userId);
    this.state.memberList.splice(userIndex, 1);

    const toDeleteIndex = this.state.members.findIndex((member, i) => {
      return member._id === userId;
    })
    this.state.members.splice(toDeleteIndex, 1);

    this.state.isMember = false;

  }
  inputChange(e) {
    this.state.invitedUser = e.target.value;
  }
  inviteUser(e) {
    e.preventDefault();

    const group = this.props.data.group;
    $.ajax({
      url: `/api/checkUser`,
      type: "GET",
      data: {user: this.state.invitedUser}
    }).done((response) => {
      if (response && group.memberList.indexOf(response.id) === -1) {
        $.ajax({
          url: `/api/groups/inviteToGroup/${this.props.data.group._id}`,
          type: 'POST',
          data: {_id: response.id}
        }).done((res) => {
          this.setState({group: res });
        })
      } else if (!response) {
        alert('No User Found with that Username/Email')
      } else {
        alert('User already A Member')
      }
    });
  }
  render() {
    const { userInfo, data = {} } = this.props;
    const { group, members, conventions, conMemberTracker } = data

    if (group && !this.state.memberList && userInfo) {
      this.state.memberList = group.memberList;
      this.state.isMember = this.state.memberList.indexOf(userInfo._id) > -1;

      this.state.isInvited = userInfo.invitedToGroups.indexOf(group._id) > -1;
      this.state.members = members;
    }
    return (
      <div> {group && userInfo && members &&
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <div className="col-sm-12">
              <div className='floatRight'>
                {!this.state.isMember && this.state.isInvited &&
                  <button className="btn btn-primary" onClick={this.joinGroup.bind(this)}>Join Group</button>
                }
                {this.state.isMember &&
                  <button className="btn btn-danger" onClick={this.leaveGroup.bind(this)}>LEAVE GROUP</button>
                }
              </div>
              {this.state.isMember && <div className='floatLeft'>
                <form className="form-group" onSubmit={this.inviteUser.bind(this)}>
                  <fieldset>
                    <input type='text' className='form-control' onChange={this.inputChange.bind(this)} />
                    <button className="btn btn-info" type='submit'>Invite User</button>
                  </fieldset>
                </form>
              </div>}
            </div>
            <div className="col-sm-12">
              <h3>Group Details: </h3>
              <ul>
                <li>Name: {group.name}</li>
                <li>Affiliation: {group.affiliation}</li>
                <li>Group Creator: {group.creatorName}</li>
              </ul>
              <h3>Notes: </h3>
              <p>{group.notes} </p>
              <h3>Members:</h3>
              <ul>{this.state.members.map(member => (<li key={member._id}>{member.username}</li>))}</ul>
            </div>
          </div>
          <div className="col-sm-8 col-sm-offset-2">
            <h3>Conventions:</h3>
            <GroupConventions
              handleClick={this.handleClick}
              conventions={conventions}
              conMemberTracker={conMemberTracker}
            />
          </div>
        </div>
        }
      </div>
    )
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, data: state.group.response};
}
export default connect(mapStateToProps, actions)(SingleGroup);
