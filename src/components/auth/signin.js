import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit, fields: {email, password}} = this.props;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='col-sm-6 col-sm-offset-3'>
              <div className='signUpInContainer'>
                <h2>Login: </h2>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <fieldset className="form-group">
                    <label>Email: </label>
                    <input {...email} className="form-control"/>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Password: </label>
                    <input {...password} className="form-control" type='password'/>
                  </fieldset>
                  { this.renderAlert() }
                  <button action="submit" className="btn btn-primary">Sign In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({ // basically same as connect
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
