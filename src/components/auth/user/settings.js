import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { reduxForm } from 'redux-form';

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
  componentWillMount() {
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
  onEmailChange(event) {
    this.props.userInfo.username =+ event.target.value
  }

  handleFormSubmit(formProps) { //called with props from submit form
    this.props.editUser(formProps, this.props.userInfo._id);
    this.setState({
      editEmail: false,
      editPhone: false,
      editUser: false,
      editPhoto: false,
    });
    this.props.fetchInfo();
  }

  render() {
    let self = this;
    const { handleSubmit, fields: {phoneNumber, email, photo }} = this.props;

    const { userInfo } = this.props;
    console.log(userInfo)
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
                    {phoneNumber.touched && phoneNumber.error && <div className="error">{phoneNumber.error}</div>}
                    <input className="form-control" type="tel" {...phoneNumber}/>
                  </fieldset>
                  <button type='button' className="btn btn-danger"
                    onClick={function(){
                      this.handleClick({editPhone: false})
                    }.bind(this)}>
                    hide
                  </button>
                  <button onClick={handleSubmit(this.handleFormSubmit.bind(this))} className="btn btn-primary">Save</button>
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
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                    <input className="form-control" {...email}/>
                  </fieldset>
                  <button type='button' className="btn btn-danger"
                    onClick={function(){
                      this.handleClick({editEmail: false})
                    }.bind(this)}>
                    hide
                  </button>
                  <button onClick={handleSubmit(this.handleFormSubmit.bind(this))} className="btn btn-primary">Save</button>
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
                    {photo.touched && photo.error && <div className="error">{photo.error}</div>}
                    <input className="form-control" {...photo}/>
                  </fieldset>
                  <button type='button' className="btn btn-danger"
                    onClick={function(){
                      this.handleClick({editPhoto: false})
                    }.bind(this)}>
                    hide
                  </button>
                  <button onClick={handleSubmit(this.handleFormSubmit.bind(this))} className="btn btn-primary">Save</button>
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

export default reduxForm({
  form: 'Settings',
  fields: ['email', 'phoneNumber', 'photo'],
}, mapStateToProps, actions)(Settings);
