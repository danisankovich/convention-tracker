import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import utils from '../../utils.js';

class Convention extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchConventions()
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/conventions/${clickResult}`);
  }
  render() {
    const { conventions } = this.props;
    return (
      <div>
        <h1>MAKE THIS A TABLE. ONLY STATE AND CITY AND NAME AND TAGS</h1>
        {conventions && <div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Convention Name</th>
                <th>Dates</th>
                <th>Location</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {
                conventions.map((convention) => {
                  const location = utils.locationFormatter(convention.location);

                  return (
                    <tr className='table-row' key={convention._id} onClick={this.handleClick.bind(convention)}>
                      <td>{convention.name.toUpperCase()}</td>
                      <td>{convention.startdate} -- {convention.enddate}</td>
                      <td>{location.city}, {location.state}</td>
                      <td>{convention.tags}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>}
        {!conventions && <h1>Loading</h1>}
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {conventions: state.convention.conventions};
}
export default connect(mapStateToProps, actions)(Convention);
