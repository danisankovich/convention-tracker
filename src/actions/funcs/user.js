import $ from 'jquery';
import { browserHistory } from 'react-router'; // commits info about url to react router, and to make changes to url
import {
  AUTH_USER,
  AUTH_ERROR,
  EDIT_USER,
  UNAUTH_USER,
  FETCH_INFO,
  FETCH_PROFILE
} from '../types';

// const ROOT_URL = 'http://localhost:3000/api';

exports.signIn = function(dispatch, {email, password}) {
  $.post(`/api/signin`, { email, password })
    .done(response => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.token);
      browserHistory.push('/'); // success pushes you to /information.
    })
    .fail(() => {
      // catch does not take you to new page
      dispatch(authError('EMAIL/PASSWORD combo incorrect'));
    })
}

exports.signUp = function(dispatch, {email, password, username}) {

  $.ajax({
    url: `/api/signup`,
    type: "POST",
    data: {email, password, username},
  })
    .done(response => {
      dispatch({type: AUTH_USER});

      localStorage.setItem('token', response.token);

      browserHistory.push('/'); // success pushes you to /information.
    }).fail((error) => {
      dispatch(authError(error.responseText));
    });
}

exports.userEdit = function(dispatch, value, type, user) {
  dispatch({type: EDIT_USER});
  const data = JSON.stringify({value, type, user});
  $.ajax({
    url: `/api/editInfo`,
    type: "POST",
    data: {data},
  })
    .done(response => {
      dispatch({type: FETCH_INFO});
    }).fail((error) => {
      dispatch(authError(error.response.error));
    });
}

exports.getUser = function(dispatch) {
  var token = localStorage.getItem('token')
  $.ajax({
     url: '/api/',
     type: "GET",
     headers: {
        "authorization": token
     }
  }).done((response) => {
    dispatch({
      type: FETCH_INFO,
      payload: response
    })
  }).fail((err) => {
    console.log('error', err)
  });
}
exports.getUserProfile = function(dispatch, userId) {
  $.ajax({
     url: `/api/user/${userId}`,
     type: "GET"
  }).done((response) => {
    dispatch({
      type: FETCH_PROFILE,
      payload: response
    })
  }).fail((err) => {
    console.log('error', err)
  });
}
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

exports.deleteConvention = function(id, dispatch) {
  var token = localStorage.getItem('token')
  $.ajax({
     url: `/api/conventions/deleteConvention/${id}`,
     type: "DELETE",
     headers: {
       "authorization": token
     }
  }).done((response) => {
    dispatch({
      type: FETCH_INFO,
      payload: response
    })
  }).fail((err) => {
    console.log('error', err)
  });
}

exports.joinConvention = function(id, dispatch) {
  var token = localStorage.getItem('token')
  $.ajax({
     url: `/api/conventions/joinConvention/${id}`,
     type: "POST",
     headers: {
       "authorization": token
     }
  }).done((response) => {
    dispatch({
      type: FETCH_INFO,
      payload: response
    })
  }).fail((err) => {
    console.log('error', err)
  });
}
