import React, { Component } from 'react';
import {connect} from 'react-redux';
import Datetime from 'react-datetime';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';
import {Link} from 'react-router';


class NewConvention extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    this.props.fetchInfo();
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.state.user = this.props.userInfo._id;
    this.state.username = this.props.userInfo.username;
    this.state.email = this.props.userInfo.email;
    this.props.newConvention(this.state)
  }
  handleChange(type, e) {
    this.state[type] = e.target.value;
  }
  handleChangeDate(type, e) {
    this.state[type] = e._d;
  }
  render() {
    const {userInfo} = this.props
    return (
      <div>
        {userInfo && <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
              <form onSubmit={this.handleFormSubmit.bind(this)}>
                <fieldset className="form-group">
                  <label>Event Name: </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'name')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Location Name: </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'locationName')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Address: </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'address')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>City: </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'city')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>State: </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'state')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Zip Code: </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'zipcode')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Country: </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'country')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Price Details: </label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'price')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Start Time: </label>
                  <Datetime onChange={this.handleChangeDate.bind(this, 'startdate')}/>
                </fieldset>
                <fieldset className="form-group">
                  <label>End Time: </label>
                  <Datetime onChange={this.handleChangeDate.bind(this, 'enddate')}/>
                </fieldset>
                <fieldset className="form-group">
                  <label>Describe the Event: </label>
                  <textarea
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'description')}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <label>Notes: </label>
                  <input
                    placeholder="Any Additional Notes? (ex. 21+, price, etc.). separate by commas"
                    className="form-control"
                    type="text"
                    onChange={this.handleChange.bind(this, 'notes')}
                  />
                </fieldset>
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

export default connect(mapStateToProps, actions)(NewConvention);
