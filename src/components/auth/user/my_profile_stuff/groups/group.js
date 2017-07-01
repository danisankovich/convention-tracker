import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import utils from '../../../../../utils'
import { browserHistory } from 'react-router'
import $ from 'jquery';

class SingleGroup extends Component {
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
  joinGroup(e) {
    e.preventDefault();
    const user = this.props.userInfo;
    const group = this.props.data.group;

    if (user.groups.indexOf(group._id) === -1) {
      this.props.userInfo.groups.push(group._id);
      this.props.joiningGroup(group._id);
    }
  }
  leaveGroup() {
    const groupId = this.props.data.group._id;
    this.props.leavingGroup(groupId);
    this.props.fetchGroup(groupId);
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

    return (
      <div>
        {group && userInfo && members &&
          <div className="col-sm-10 col-sm-offset-1">
            <button className="btn btn-primary" onClick={this.joinGroup.bind(this)}>Join Group</button>
            <form onSubmit={this.inviteUser.bind(this)}>
              <fieldset>
                <div>
                  <div className='col-sm-4'>
                    <input type='text' className='form-control' onChange={this.inputChange.bind(this)} />
                  </div>
                  <div className='col-sm-2'>
                    <button className="btn btn-info" type='submit'>Invite User</button>
                  </div>
                </div>
              </fieldset>
            </form>
            <button onClick={this.leaveGroup.bind(this)}>LEAVE GROUP</button>
            <div className="row">
              <div className="col-sm-12">
                <div className="col-sm-5 col-sm-offset-1">
                  <h3>Group Details: </h3>
                  <ul>
                    <li>Name: {group.name}</li>
                    <li>Affiliation: {group.affiliation}</li>
                    <li>Group Creator: {group.creatorName}</li>
                  </ul>
                  <h3>Notes: </h3>
                  <p>{group.notes} </p>
                  <h3>Members:</h3>
                  <ul>
                    {members.map(member => (<li key={member._id}>{member.username}</li>))}
                  </ul>
                  <h3>Conventions:</h3>
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Convention Name</th>
                        <th>Price Details</th>
                        <th>Address</th>
                        <th>Attendees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conventions.map(function(result) {
                        const location = utils.locationFormatter(result.location);

                        return (
                          <tr key={result._id} className='table-row'>
                            <td onClick={this.handleClick.bind(result)}>{result.name}</td>
                            <td onClick={this.handleClick.bind(result)}>${result.price}</td>
                            <td onClick={this.handleClick.bind(result)}>
                              <ul className='removeListBullet'>
                                <li>{location.locationName}</li>
                                <li>{location.address}</li>
                                <li>{location.city}, {location.state.toUpperCase()} {location.zipcode}</li>
                              </ul>
                            </td>
                            <td>
                              <ul>
                                {conMemberTracker[result._id].map(mem => <li key={mem}>{mem}</li>)}
                              </ul>
                            </td>
                          </tr>
                        )
                      }.bind(this))}
                    </tbody>
                  </table>

                </div>
              </div>
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
