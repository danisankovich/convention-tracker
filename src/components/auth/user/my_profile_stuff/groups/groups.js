import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import utils from '../../../../../utils.js';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchConventions()
    this.props.fetchGroups();
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/groups/${clickResult}`);
  }

  render() {
    const { groups = [] } = this.props;

    return (
      <div>
        {groups && <div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Group Affiliation</th>
                <th>Members</th>
                <th>Share Id</th>
              </tr>
            </thead>
            <tbody>
              {
                groups.map((group) => {
                  return (
                    <tr className='table-row' key={group._id} onClick={this.handleClick.bind(group)}>
                      <td>{group.name.toUpperCase()}</td>
                      <td>{group.affiliation.toUpperCase()}</td>
                      <td>{group.memberList.length}</td>
                      <td>{group.shareId}</td>
                    </tr>
                  )
                }).filter(Boolean)
              }
            </tbody>
          </table>

        </div>}
        {!groups && <h1>Loading</h1>}
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {groups: state.group.groups};
}
export default connect(mapStateToProps, actions)(Group);
