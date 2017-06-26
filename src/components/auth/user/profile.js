import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import MyConventions from './my_profile_stuff/myConventions';
import Groups from './my_profile_stuff/groups/groups_container';

class Profile extends Component {
  componentWillMount() {
    this.setState({
      showConventions: false,
      showGroups: false,
      showInfo: true
    })
  }
  componentDidMount() {
    this.props.fetchInfo();
  }
  show() {
    const self = this[0];
    const type = this[1];
    const hide = self.state[type] === true ? true : false
    const resetObj = {
      showConventions: false,
      showGroups: false,
      showInvites: false,
      showInfo: false
    }
    if (!hide) {
      resetObj[type] = true;
    } else {
      resetObj.showInfo = true;
    }
    self.setState(resetObj);
  }
  render() {
    let {userInfo} = this.props;
    return (
      <div className="toppush container">
        {userInfo && <div>
          <div className='row'>
            <div className='col-sm-3 col-sm-offset-2'>
              <div><img className='profilePhoto' src={userInfo.photo} alt='profile photo' /><h1>{userInfo.username + "'s"} Profile</h1></div>
            </div>
          </div>
          <div className='row'>
            <div className="col-sm-2 col-sm-offset-1">
              <button className='btn btn-primary' onClick={this.show.bind([this, 'showInfo'])}>Show Info</button>
              <button className='btn btn-primary' onClick={this.show.bind([this, 'showConventions'])}>Show Conventions ({this.props.userInfo.myConventions.length})</button>
              <button className='btn btn-primary' onClick={this.show.bind([this, 'showGroups'])}>Show Groups ({this.props.userInfo.groups.length})</button>
              <button className='btn btn-primary' onClick={this.show.bind([this, 'showInvites'])}>Show Pending Invites ({this.props.userInfo.invitedToGroups.length})</button>
            </div>
            <div className="col-sm-8 col-sm-offset-1">
              {this.state.showInfo && <div className="col-sm-offset-1">
                <h3>Email: {userInfo.email}</h3>
                <h3>Phone Number: {userInfo.phoneNumber}</h3>
              </div>}
              {this.state.showConventions && <MyConventions userInfo={this.props.userInfo}></MyConventions>}
              {this.state.showGroups && <Groups userInfo={this.props.userInfo}></Groups>}
              {this.state.showInvites && <Groups userInfo={this.props.userInfo} groupType='invites'></Groups>}
            </div>
          </div>
        </div>}
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(Profile);
