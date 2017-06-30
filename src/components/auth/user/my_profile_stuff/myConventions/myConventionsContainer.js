import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import { browserHistory } from 'react-router'
import OneConvention from './oneConvention';

class MyConventions extends Component {
  constructor(props) {
    super(props)
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
  deleteClickHandle(clicked) {
    const clickResult = clicked._id;

    this.props.myconventions.forEach((con, i) => {
      if (clickResult === con._id) {
        this.props.myconventions.splice(i, 1)
        this.props.removeConvention(clickResult);
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
                return (
                  <OneConvention
                    result={result}
                    myconventions={myconventions}
                    handleClick={this.handleClick}
                    deleteClickHandle={this.deleteClickHandle}
                    removeConvention={this.props.removeConvention}
                    isDashboard={isDashboard}
                    key={result._id}
                  />
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
