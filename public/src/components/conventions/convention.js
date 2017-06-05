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
    let convention = this.state.convention
    convention.type = this.state.type

    this.props.editConvention({convention}, this.props.userInfo._id)
    this.setState({editAddress: false, editPrice: false})
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    let {convention, userInfo} = this.props;
    let usCities = []

    let incrementKey = 0
    if(convention && userInfo) {
      this.state.convention = convention
      return (
          <div className="col-sm-10 col-sm-offset-1">
              <hr />
              <div className="row">
                <div className="col-sm-12">
                  <div className="col-sm-5 col-sm-offset-1">
                    <h3>Convention Details: </h3>
                    <ul>
                      <li>Name: {convention.name}</li>
                      <li
                        className={this.state.editPrice ? 'hidden' : ''}
                        onClick={function(){
                          if (this.props.userInfo._id === this.props.convention.creator.id) {
                            this.handleClick({editPrice: true})
                          }
                        }.bind(this)}
                        >
                        Price: ${convention.price} / night
                      </li>
                      {this.props.userInfo._id === this.props.convention.creator.id && <li className={this.state.editPrice ? '' : 'hidden'}>
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
                              if (this.props.userInfo._id === this.props.convention.creator.id) {
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
                  </div>
                </div>
              </div>
          <br />
        </div>
    );
  }
  return (
    <div>Loading...... </div>
  );
};
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, convention: state.convention.convention};
}
export default connect(mapStateToProps, actions)(SingleConvention);
