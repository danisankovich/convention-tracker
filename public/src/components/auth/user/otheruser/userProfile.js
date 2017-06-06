import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../actions';
import ProfileConventions from './profileconventions';
import $ from 'jquery';

class UserProfile extends Component {
  componentWillMount() {
    this.setState({showConventions: false})
  }
  componentDidMount() {
    this.props.fetchInfo();
    let id = this.props.location.pathname.split('userprofile/')[1]
    this.props.fetchProfileInfo(id);
  }
  unfollowOrFollowUser() {
    var token = localStorage.getItem('token');
    var url = this[1];
    $.ajax({
       url,
       type: "PUT",
       data: {user: this[0].props.userProfile._id},
       headers: {
          "authorization": token
       }
    }).done((response) => {
      if (url === '/api/addfollower') alert(this[0].props.userProfile.username + ' has been added to your following list')
      if (url === '/api/removefollower') alert(this[0].props.userProfile.username + ' has been removed from your following list')
      this[0].props.fetchInfo();
    }).fail((err) => {
      console.log('error', err)
    });
  }
  showAlbums() {
    this.state.showConventions = false
  }
  showConventions() {
    this.state.showConventions ? this.setState({showConventions: false}) : this.setState({showConventions: true})
  }

  render() {
    let {userProfile, userInfo} = this.props;
    if(userProfile) {
      return (
        <div className="toppush container">
          <div className='row'>
            <div className="col-sm-10 col-sm-offset-1">
              <h2>{userProfile.username + "'s"} Profile</h2>
              {userInfo && userInfo.following.indexOf(userProfile._id) === -1 && <h3>
                <button className='btn btn-primary' onClick={this.unfollowOrFollowUser.bind([this, '/api/addfollower'])}>Follow +</button></h3>}
              {userInfo && userInfo.following.indexOf(userProfile._id) > -1 && <h3>
                <button className='btn btn-danger' onClick={this.unfollowOrFollowUser.bind([this, '/api/removefollower'])}>Unfollow -</button></h3>}
              <h3>Email: {userProfile.email}</h3>
              <h3>Phone Number: {userProfile.phoneNumber}</h3>
            </div>
          </div>
          <div className='row'>
            <div className="col-sm-10 col-sm-offset-1">
              <button onClick={this.showAlbums.bind(this)}>Show Albums</button>
              <button onClick={this.showConventions.bind(this)}>Show Conventions</button>
            </div>
            <div className="col-sm-10 col-sm-offset-1">
              {this.state.showConventions && <ProfileConventions userProfile={this.props.userProfile} userInfo={this.props.userInfo}></ProfileConventions>}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>Loading........ </div>
    );
  };
}
function mapStateToProps(state) {
  return {userProfile: state.auth.userProfile, userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(UserProfile);
