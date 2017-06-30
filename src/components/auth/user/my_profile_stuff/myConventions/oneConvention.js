import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import utils from '../../../../../utils.js';
import _ from 'lodash'

class OneConvention extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isDashboard, result } = this.props;

    const location = utils.locationFormatter(result.location);

    return (
      <tr className='table-row'>
        <td onClick={this.props.handleClick.bind(result)}>{result.name}</td>
        {isDashboard && <td onClick={this.props.handleClick.bind(result)}>${result.price}</td>}
        <td onClick={this.props.handleClick.bind(result)}>{result.startdate} -- {result.enddate}</td>
        <td onClick={this.props.handleClick.bind(result)}>
          <ul className='removeListBullet'>
            <li>{location.locationName}</li>
            <li>{location.address}</li>
            <li>{location.city}, {location.state.toUpperCase()} {location.zipcode}</li>
          </ul>
        </td>
        {!isDashboard &&
          <td onClick={this.props.deleteClickHandle.bind(this, result)}>
            <button type="button" className="btn btn-default">
              Remove <span
                className="glyphicon glyphicon-remove-circle" aria-hidden="true"
                onClick={this.props.deleteClickHandle.bind(this, result)}
              ></span>
          </button>
        </td>}
      </tr>
    )
  }
}

export default OneConvention;
