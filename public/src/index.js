import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';


import App from './components/app';

// Main Routes
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Profile from './components/auth/user/profile';
import MySinglePhoto from './components/auth/user/my_profile_stuff/mysinglephoto';
import UserProfile from './components/auth/user/otheruser/userProfile';
import Settings from './components/auth/user/settings';
import Welcome_Container from './components/welcome_container';

// Listings Routes
import Listings_Container from './components/listings/listings_container';
import Listing from './components/listings/listing';
import NewListing from './components/listings/newListing';


import Message_Container from './components/messages/message_container';

import RequireAuth from './components/auth/require_auth';

import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({type: AUTH_USER});
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Welcome_Container} />
          <Route path='signin' component={Signin}></Route>
          <Route path='signup' component={Signup}></Route>
          <Route path='signout' component={Signout}></Route>
          <Route path='profile' component={RequireAuth(Profile)}></Route>
          <Route path='settings' component={RequireAuth(Settings)}></Route>
          <Route path='userprofile/:id' component={UserProfile}></Route>
        </Route>
        <Route path='/listings' component={App}>
          <IndexRoute component={Listings_Container} />
          <Route path=':id' component={Listing}></Route>
          <Route path='/new' component={RequireAuth(NewListing)}></Route>
        </Route>
        <Route path ='/messages' component={App}>
          <IndexRoute component={Message_Container} />
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.thing'));
