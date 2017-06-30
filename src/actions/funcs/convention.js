import $ from 'jquery';
import { browserHistory } from 'react-router';
import {
  FETCH_CONVENTIONS,
  FETCH_MY_CONVENTIONS,
  NEW_CONVENTION,
  FETCH_SINGLE_CONVENTION,
  EDIT_CONVENTION,
} from '../types';
// const ROOT_URL = 'http://localhost:3000/api';

exports.getConvention = function(id, dispatch) {
  var token = localStorage.getItem('token')

  $.ajax({
     url: `/api/conventions/convention/${id}`,
     type: "GET",
     headers: {
        "authorization": token
     }
  }).done((response) => {
    dispatch({
      type: FETCH_SINGLE_CONVENTION,
      payload: response
    })
  });
}
exports.getAllConventions = function(term, otherParams, dispatch) {
  $.ajax({
     url: `/api/conventions/all/${term ? term : ''}`,
     type: "GET",
     data: otherParams
  }).done((response) => {
    dispatch({
      type: FETCH_CONVENTIONS,
      payload: response
    })
  });
}
exports.getMyConventions = function(array, dispatch) {
  $.ajax({
     url: '/api/conventions/myconventions',
     type: "POST",
     data: {data: JSON.stringify(array)}
  }).done((response) => {
    dispatch({
      type: FETCH_MY_CONVENTIONS,
      payload: response
    })
  });
}
exports.createConvention = function(data, dispatch) {
  var token = localStorage.getItem('token')
  $.ajax({
     url: `/api/conventions/new`,
     type: "POST",
     headers: {
        "authorization": token
     },
     data: data
  }).done((response) => {
    browserHistory.push(`/conventions/${response._id}`)
    dispatch({
      type: NEW_CONVENTION,
      payload: response
    })
  })
}
exports.edit = function(convention, userId, dispatch) {
  var token = localStorage.getItem('token')
  let data = JSON.stringify(convention)
  $.ajax({
     url: `/api/conventions/editConvention`,
     type: "POST",
     headers: {
        "authorization": token
     },
     data: {data}
  }).done((response) => {
    dispatch({
      type: EDIT_CONVENTION,
      payload: response
    })
  })
}
