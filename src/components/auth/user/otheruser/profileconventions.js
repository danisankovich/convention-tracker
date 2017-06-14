import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../actions';
import { browserHistory } from 'react-router'
class MyConventions extends Component {
  componentWillMount() {
    let conventions = this.props.userProfile.myConventions
    this.props.fetchMyConventions(conventions)
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/conventions/${clickResult}`);
  }
  saveClickHandle(e) {
    e.preventDefault();
    let clickResult = this[1]._id;
    let array = this[0].userProfile.myConventions;
    let index = this[0].userProfile.myConventions.indexOf(clickResult)
    array.splice(index, 1)
  }
  render() {
    let conventions = this.props.myconventions || []
    if(conventions) {
      return (
        <div>
          {conventions && conventions.length > 0 && <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Convention Name</th>
                <th>Rating</th>
                <th>Save Convention</th>
              </tr>
            </thead>
            <tbody>
              {conventions.map(function(result) {
                return (
                  <tr key={result._id} className='table-row'>
                    <td onClick={this.handleClick.bind(result)}>{result.title}</td>
                    <td onClick={this.handleClick.bind(result)}>rating</td>
                    <td onClick={this.saveClickHandle.bind([this.props, result])}><button>X</button></td>
                  </tr>)
              }.bind(this))}
            </tbody>
          </table>}
        </div>
      )
    } else {
      return <div>LOADING...</div>
    }

  }
}

function mapStateToProps(state) {
  return {userProfile: state.auth.userProfile, myconventions: state.convention.myconventions};
}
export default connect(mapStateToProps, actions)(MyConventions);
