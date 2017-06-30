import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../actions';
import { browserHistory } from 'react-router'
import utils from '../../../../utils.js';
import _ from 'lodash'
class MyConventions extends Component {
  constructor(props) {
    super(props)
    this.state = {conventions: []};
  }
  componentDidMount() {
    let conventions = [];

    if (this.props.userInfo) {
      conventions = this.props.userInfo.myConventions
    }

    this.props.fetchMyConventions(conventions)
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/conventions/${clickResult}`);
  }
  deleteClickHandle(e) {
    e.preventDefault();
    let clickResult = this[1]._id;
    let array = this[2].state.conventions;
    let index;
    this[2].state.conventions.forEach((con, i) => {
      if (clickResult === con._id) {
        this[2].state.conventions.splice(i, 1)
        this[0].removeConvention(clickResult);
      }
    });
  }
  render() {
    const { myconventions = [], pathInfo: isDashboard } = this.props;

    return (
      <div>
        {myconventions && myconventions.length > 0 &&
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Convention Name</th>
                {isDashboard && <th>Price Details</th>}
                <th>Dates</th>
                <th>Address</th>
                {!isDashboard && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {myconventions.map(function(result) {
                const location = utils.locationFormatter(result.location);

                return (
                  <tr key={result._id} className='table-row'>
                    <td onClick={this.handleClick.bind(result)}>{result.name}</td>
                    {isDashboard && <td onClick={this.handleClick.bind(result)}>${result.price}</td>}
                    <td>{result.startdate} -- {result.enddate}</td>
                    <td onClick={this.handleClick.bind(result)}>
                      <ul className='removeListBullet'>
                        <li>{location.locationName}</li>
                        <li>{location.address}</li>
                        <li>{location.city}, {location.state.toUpperCase()} {location.zipcode}</li>
                      </ul>
                    </td>
                    {!isDashboard &&
                      <td onClick={this.deleteClickHandle.bind([this.props, result, this])}>
                        <button type="button" className="btn btn-default">
                          Remove <span
                          className="glyphicon glyphicon-remove-circle" aria-hidden="true"
                          onClick={this.deleteClickHandle.bind([this.props, result, this])}
                          ></span>
                      </button>
                    </td>}
                  </tr>
                )
              }.bind(this))}
            </tbody>
          </table>
        }
        {myconventions.length === 0 && <p>No Conventions Found</p>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, myconventions: state.convention.myconventions, userStuff: state.auth};
}
export default connect(mapStateToProps, actions)(MyConventions);
