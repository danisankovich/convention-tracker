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
  filterConventions() {
    let filterParams = this;
    console.log(filterParams);
    this.setState({filter: this})
  }

  onDropdownSelected(e) {
    this.setState({filter: e.target.value})
  }
  render() {
    const { conventions } = this.props;

    return (
      <div>
        <div>
          <label>Filter By State: &nbsp;
            <select onChange={this.onDropdownSelected.bind(this)}>
              <option value=''></option>
              {
                utils.usStates.map((a, i) => (<option key={i} value={a.abbreviation}>{a.name}</option>))
              }
            </select>
          </label>

        </div>
        {conventions && <div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Convention Name</th>
                <th>Dates</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {
                conventions.map((convention) => {
                  const location = utils.locationFormatter(convention.location);
                  if (!this.state.filter || convention.location.state.toLowerCase() === this.state.filter.toLowerCase()) {
                    return (
                      <tr className='table-row' key={convention._id} onClick={this.handleClick.bind(convention)}>
                        <td>{convention.name.toUpperCase()}</td>
                        <td>{convention.startdate} -- {convention.enddate}</td>
                        <td>{location.city}, {location.state.toUpperCase()}</td>
                      </tr>
                    )
                  }
                }).filter(Boolean)
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
