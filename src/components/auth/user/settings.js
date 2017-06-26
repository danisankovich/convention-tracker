import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
// import { reduxForm } from 'redux-form';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmail: false,
      editPhone: false,
      editUser: false,
      editPhoto: false,
    };
  }
  componentDidMount() {
    this.setState({
      editEmail: false,
      editPhone: false,
      editUser: false,
      editPhoto: false,
    });
    this.props.fetchInfo();
  }
  // handle hide/show clicks
  handleClick(type) {
    this.setState(type);
    if (Object.keys(type)[0] === 'editUser') {
      this.setState({username: this.props.userInfo.userName})
    }
  }

  handleFormSubmit(a, e) { //called with props from submit form
    e.preventDefault();
    console.log(a, this.props.userInfo._id)

    this.props.editUser(this.state[a], a, this.props.userInfo._id);
    this.setState({
      editEmail: false,
      editPhone: false,
      editUser: false,
      editPhoto: false,
    });
    this.props.fetchInfo();
  }

  onPhoneInputChange(e) {
    this.setState({phoneNumber: e.target.value});
  }
  onEmailInputChange(e) {
    this.setState({email: e.target.value});
  }
  onPhotoInputChange(e) {
    this.setState({photo: e.target.value});
  }
  render() {
    // const { handleSubmit, fields: {phoneNumber, email, photo }, userInfo} = this.props;
    const {userInfo} = this.props;
    if (userInfo) {
      if (!this.state.phoneNumber) this.state.phoneNumber = userInfo.phoneNumber;
      if (!this.state.email) this.state.email = userInfo.email;
      if (!this.state.photo) this.state.photo = userInfo.photo;
    }

    return (
      <div>
        {userInfo &&
          <div className="toppush">
            <h3>Settings</h3>
            <p>Edit User Info: </p>
            <ul>
              <li>
                Username: {userInfo.username}
              </li>
              <li>Click On the Properties Below to Edit</li>
              <li
                className={this.state.editPhone ? 'hidden' : ''}
                onClick={function(){
                  this.handleClick({editPhone: true})
                }.bind(this)}>
                Phone Number: {userInfo.phoneNumber || 'Set Number'}
              </li>
              <li className={this.state.editPhone ? '' : 'hidden'}>
                <form>
                  <fieldset className="form-group">
                    <label>Phone Number: {userInfo.phoneNumber}</label>
                    <input className="form-control" type="tel" value={this.state.phoneNumber} onChange={this.onPhoneInputChange.bind(this)} />
                  </fieldset>
                  <button type='button' className="btn btn-danger"
                    onClick={function(){
                      this.handleClick({editPhone: false})
                    }.bind(this)}>
                    hide
                  </button>
                  <button onClick={this.handleFormSubmit.bind(this, 'phoneNumber')} className="btn btn-primary">Save</button>
                </form>
              </li>
              <li
                className={this.state.editEmail ? 'hidden' : ''}
                onClick={function(){
                  this.handleClick({editEmail: true})
                }.bind(this)}>
                Email: {userInfo.email}
              </li>
              <li className={this.state.editEmail ? '' : 'hidden'}>
                <form>
                  <fieldset className="form-group">
                    <label>Email: {userInfo.email}</label>
                    <input type="text" className="form-control" value={this.state.email} onChange={this.onEmailInputChange.bind(this)}/>
                  </fieldset>
                  <button type='button' className="btn btn-danger"
                    onClick={function(){
                      this.handleClick({editEmail: false})
                    }.bind(this)}>
                    hide
                  </button>
                  <button onClick={this.handleFormSubmit.bind(this, 'email')} className="btn btn-primary">Save</button>
                </form>
              </li>
              <li
                className={this.state.editPhoto ? 'hidden' : ''}
                onClick={function(){
                  this.handleClick({editPhoto: true})
                }.bind(this)}>
                Photo: <img className='profilePhoto' src={userInfo.photo} alt='Profile Photo' />
              </li>
              <li className={this.state.editPhoto ? '' : 'hidden'}>
                <form>
                  <fieldset className="form-group">
                    <label>Photo: {userInfo.photo}</label>
                    <input type="text" className="form-control" value={this.state.photo} onChange={this.onPhotoInputChange.bind(this)}/>
                  </fieldset>
                  <button type='button' className="btn btn-danger"
                    onClick={function(){
                      this.handleClick({editPhoto: false})
                    }.bind(this)}>
                    hide
                  </button>
                  <button onClick={this.handleFormSubmit.bind(this, 'photo')} className="btn btn-primary">Save</button>
                </form>
              </li>
            </ul>
          </div>
        }
        {!userInfo && <div>adsfasfd</div>}
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
  };
}

// export default reduxForm({
//   form: 'Settings',
//   fields: ['email', 'phoneNumber', 'photo'],
// }, mapStateToProps, actions)(Settings);
export default connect(mapStateToProps, actions)(Settings);
