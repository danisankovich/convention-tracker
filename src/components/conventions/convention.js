import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'
import $ from 'jquery';

class SingleConvention extends Component {
  componentWillMount() {
    this.setState({convention: '', inputValue: ''})
  }
  componentDidMount() {
    let id = this.props.location.pathname.split('conventions/')[1]
    this.props.fetchSingleConvention(id);
  }
  handleClick(type) {
    if(this.props.userInfo._id = this.props.convention.creator.id) {
      this.setState(type);
    }
  }

  handleFormSubmit(e) { //called with props from submit form
    e.preventDefault();
    let convention = this.props.convention
    convention.type = this.state.type

    this.props.editConvention({convention}, this.props.userInfo._id)
    this.setState({editAddress: false, editPrice: false})
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  goingToConvention() {
    const user = this.props.userInfo;
    const con = this.props.convention;
    if (user.myConventions.indexOf(con._id) === -1) {
      this.props.userInfo.myConventions.push(con._id);
      this.props.addConventionToMyList(con._id);
    }
  }
  render() {
    let {convention, userInfo} = this.props;
    let usCities = []

    return (
      <div>
        {
          convention &&
            <div className="col-sm-10 col-sm-offset-1">
              {userInfo && (userInfo.myConventions.indexOf(convention._id) === -1) && <button onClick={this.goingToConvention.bind(this)}>Going</button>}
              <hr />
              <div className="row">
                <div className="col-sm-12">
                  <div className="col-sm-5 col-sm-offset-1">
                    <h3>Convention Details: </h3>
                    <ul>
                      <li>Convention Name: {convention.name}</li>
                      <li>Convention Dates: {convention.startdate} -- {convention.enddate}</li>
                      {userInfo && <li
                        className={this.state.editPrice ? 'hidden' : ''}
                        onClick={function(){
                          if (this.props.userInfo._id === this.props.convention.creator.id) {
                            this.handleClick({editPrice: true})
                          }
                        }.bind(this)}
                        >
                        Price Details: ${convention.price}
                      </li>}
                      <li>Address:
                        <ul className='removeListBullet'>
                          <li>Convention Center: {convention.location.locationName}</li>
                          <li>{convention.location.address}</li>
                          <li>{convention.location.city}, {convention.location.state.toUpperCase()} {convention.location.zipcode}</li>
                        </ul>
                      </li>
                      {userInfo && userInfo._id === convention.creator.id && <li className={this.state.editPrice ? '' : 'hidden'}>
                      <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <fieldset className="form-group">
                          <label>New Price: </label>
                          <input className="form-control" type="number" min="0.01" step="0.01" max="5000.00"
                            onChange={function(evt) {
                              this.setState({
                                inputValue: evt.target.value, type: 'price'
                              });
                            }.bind(this)}/>
                          </fieldset>
                          <button type='button' className="btn btn-danger"
                            onClick={function(){
                              if (this.props.userInfo._id === convention.creator.id) {
                                this.handleClick({editPrice: false})
                              }
                            }.bind(this)}>
                            hide
                          </button>
                          <button action="submit" className="btn btn-primary">Save</button>
                        </form>
                      </li>}
                    </ul>
                    <h3>Description: </h3>
                    <p>{convention.description} </p>
                    {
                      convention.notes &&
                      <div>
                        <h3>Additional Notes: </h3>
                        <p>{convention.notes} </p>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <br />
            </div>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, convention: state.convention.convention};
}
export default connect(mapStateToProps, actions)(SingleConvention);
