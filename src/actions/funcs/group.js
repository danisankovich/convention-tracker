import $ from 'jquery';
import { browserHistory } from 'react-router'; // commits info about url to react router, and to make changes to url
import {
  FETCH_GROUPS,
  NEW_GROUP,
  FETCH_SINGLE_GROUP,
  LEAVE_GROUP,
  JOIN_GROUP,
  EDIT_GROUP,
} from '../types';

exports.getAllGroups = function(dispatch, type) {
  var token = localStorage.getItem('token')

  $.ajax({
     url: `/api/groups/all/`,
     type: "GET",
     headers: {
        "authorization": token
     },
     data: {type}
  }).done((response) => {
    dispatch({
      type: FETCH_GROUPS,
      payload: response
    })
  });
}

exports.createGroup = (data, dispatch) => {
  const token = localStorage.getItem('token')
  $.ajax({
     url: `/api/groups/new`,
     type: "POST",
     headers: {
        "authorization": token
     },
     data,
  }).done((response) => {
    dispatch({
      type: NEW_GROUP,
      payload: response
    })
  })
}

exports.getGroup = function(id, dispatch) {
  const token = localStorage.getItem('token')

  $.ajax({
     url: `/api/groups/group/${id}`,
     type: "GET",
     headers: {
        "authorization": token
     }
  }).done((response) => {
    dispatch({
      type: FETCH_SINGLE_GROUP,
      payload: response
    })
  });
}

exports.joinGroup = function(data, dispatch) {
  const token = localStorage.getItem('token');

  $.ajax({
     url: `/api/groups/join/`,
     type: "POST",
     headers: {
        "authorization": token
     },
     data: {groupId: data}
  }).done((response) => {
    dispatch({
      type: FETCH_SINGLE_GROUP,
      payload: response
    })
  });
}
