import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../actions';
import { browserHistory } from 'react-router'
import utils from '../../../../utils.js';
import _ from 'lodash'
class MyConventions extends Component {
  componentWillMount() {
    let conventions = this.props.userInfo.myConventions
    this.props.fetchMyConventions(conventions)
    this.setState({conventions: []})
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/conventions/${clickResult}`);
  }
  deleteClickHandle(e) {
    e.preventDefault();
    let clickResult = this[1]._id;
    let array = this[2].state.conventions;
    let index = this[2].state.conventions.indexOf(clickResult)
    this[2].state.conventions.splice(index, 1)
    this[0].removeConvention(clickResult);
  }
  render() {
    this.state.conventions = this.props.myconventions || []
    if(this.state.conventions) {
      return (
        <div>
          {this.state.conventions && this.state.conventions.length > 0 && <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Convention Name</th>
                <th>Price Details</th>
                <th>Address</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.conventions.map(function(result) {
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
                    <td onClick={this.deleteClickHandle.bind([this.props, result, this])}>
                      <button type="button" className="btn btn-default">
                         Remove <span
                          className="glyphicon glyphicon-remove-circle" aria-hidden="true"
                          onClick={this.deleteClickHandle.bind([this.props, result, this])}
                        ></span>
                      </button>
                    </td>
                  </tr>
                )
              }.bind(this))}
            </tbody>
          </table>}
        </div>
      )
    } else {
      return <div>No Conventions Found</div>
    }

  }
}

function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, myconventions: state.convention.myconventions, userStuff: state.auth};
}
export default connect(mapStateToProps, actions)(MyConventions);
