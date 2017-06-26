import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

const defaultState = {
  editEmail: false,
  editPhone: false,
  editUser: false,
  editPhoto: false,
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  componentDidMount() {
    this.setState({...defaultState});
    this.props.fetchInfo();
  }
  // handle hide/show clicks
  handleClick(type) {
    this.setState(type);
    if (Object.keys(type)[0] === 'editUser') {
      this.setState({username: this.props.userInfo.userName})
    }
  }

  handleFormSubmit(type, e) {
    e.preventDefault();

    this.props.editUser(this.state[type], type, this.props.userInfo._id);
    this.setState({...defaultState, [type]: this.state[type]});
    this.props.fetchInfo();
  }

  onInputChange(type, e) {
    this.setState({[type]: e.target.value});
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
                    <input className="form-control" type="tel" value={this.state.phoneNumber} onChange={this.onInputChange.bind(this, 'phoneNumber')} />
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
                    <input type="text" className="form-control" value={this.state.email} onChange={this.onInputChange.bind(this, 'email')}/>
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
                    <input type="text" className="form-control" value={this.state.photo} onChange={this.onInputChange.bind(this, 'photo')}/>
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
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
  };
}

export default connect(mapStateToProps, actions)(Settings);
