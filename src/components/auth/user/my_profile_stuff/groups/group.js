import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import { browserHistory } from 'react-router'
import $ from 'jquery';

class SingleGroup extends Component {
  componentWillMount() {
    this.setState({group: '', inputValue: ''})
  }
  componentDidMount() {
    let id = this.props.location.pathname.split('groups/')[1]

    this.props.fetchGroup(id);
  }
  handleClick(type) {
    if(this.props.userInfo._id = this.props.group.creatorId) {
      this.setState(type);
    }
  }

  handleFormSubmit(e) { //called with props from submit form
    e.preventDefault();
    let group = this.state.group
    group.type = this.state.type

    this.props.editGroup({group}, this.props.userInfo._id)
    this.setState({editAddress: false, editPrice: false})
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  leaveGroup() {
    const user = this.props.userInfo;
    const group = this.props.group;
    if (user.groups.indexOf(group._id) === -1) {
      this.props.userInfo.groups.push(group._id);
      this.props.joiningGroup(group._id);
    }
  }
  inputChange(e) {
    this.state.invitedUser = e.target.value;
    console.log(e.target.value)
  }
  inviteUser(e) {
    e.preventDefault();
    console.log(this.state.invitedUser)
    const group = this.state.group;
    $.ajax({
       url: `/api/checkUser`,
       type: "GET",
       data: {user: this.state.invitedUser}
    }).done((response) => {
      if (response && group.memberList.indexOf(response.id) === -1) {
        $.ajax({
          url: `/api/groups/joinGroup/${this.props.group._id}`,
          type: 'POST',
          data: {_id: response.id}
        }).done((res) => {
          this.state.group.memberList.push(response.id);
        })
      } else if (!response) {
        alert('No User Found with that Username/Email')
      } else {
        alert('User already A Member')
      }
    });
  }
  render() {
    let {group = {}, userInfo} = this.props;
    console.log(group)
    let incrementKey = 0
    if(group && userInfo) {
      this.state.group = group
      return (
        <div className="col-sm-10 col-sm-offset-1">
          <button onClick={this.leaveGroup.bind(this)}>Going</button>
          <form onSubmit={this.inviteUser.bind(this)}>
            <fieldset>
              <input type='text' onChange={this.inputChange.bind(this)} />
              <button type='submit'>Invite User</button>
            </fieldset>
          </form>
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-5 col-sm-offset-1">
                <h3>Group Details: </h3>
                <ul>
                  <li>Name: {group.name}</li>
                </ul>
                <h3>Description: </h3>
                <p>{group.notes} </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>Loading...... </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, group: state.group.group};
}
export default connect(mapStateToProps, actions)(SingleGroup);
