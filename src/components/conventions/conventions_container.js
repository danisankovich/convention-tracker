import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Conventions from './conventions';
import {Link} from 'react-router';

//WELCOMING PAGE
class Conventions_Container extends Component {
  render() {
      return (
        <div className='container toppush'>
          <div className="row">
            <div className="col-sm-12">
              <h1 className='text-center'>Conventions</h1>
              <Link to="/new"><button className="btn btn-success">Post New Convention</button></Link>
            </div>
          </div>
          <br />
          <div className='row'>
            <Conventions />
          </div>
        </div>
      );
  };
}

module.exports = Conventions_Container
