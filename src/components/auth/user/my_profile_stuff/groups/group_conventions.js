import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import utils from '../../../../../utils'
import { browserHistory } from 'react-router'
import $ from 'jquery';

class GroupConventions extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { conventions, conMemberTracker } = this.props;

    return (
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
            <td onClick={this.props.handleClick.bind(result)}>{result.name}</td>
            <td onClick={this.props.handleClick.bind(result)}>${result.price}</td>
            <td onClick={this.props.handleClick.bind(result)}>
              <ul className='removeListBullet'>
                <li>{location.locationName}</li>
                <li>{location.address}</li>
                <li>{location.city}, {location.state.toUpperCase()} {location.zipcode}</li>
              </ul>
            </td>
            <td onClick={this.props.handleClick.bind(result)}>
              <ul>
                {conMemberTracker[result._id].map(mem => <li key={mem}>{mem}</li>)}
              </ul>
            </td>
          </tr>
        )
      }.bind(this))}
    </tbody>
    </table>
  )
  }
}

export default GroupConventions
