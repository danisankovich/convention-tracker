import {signIn, signUp, userEdit, avatarUpload, myPhotoUpload, getUser, getUserProfile, deleteConvention} from './funcs/user';
import {getConvention, getAllConventions, getMyConventions, createConvention, edit} from './funcs/convention';
import {
  AUTH_USER,
  UNAUTH_USER,
} from './types';
//USER FUNCTIONS
export function signinUser({email, password}) {
  return function(dispatch) {
    signIn(dispatch, {email, password})
  }
}
export function signupUser({email, password, username}) {
  return function(dispatch) {
    signUp(dispatch, {email, password, username})
  }
}
export function editUser({phoneNumber, email, lang, aboutMe}, user) {
  return function(dispatch) {
    userEdit(dispatch, {phoneNumber, email, lang, aboutMe}, user)
  }
}
export function removeConvention(id) {
  console.log(id)
  return function(dispatch) {
    deleteConvention(id, dispatch)
  }
}

export function uploadMyPhoto(photo, user) {
  return function(dispatch) {
    myPhotoUpload(dispatch, photo, user);
  }
}
export function uploadAvatar(photo, user) {
  return function(dispatch) {
    avatarUpload(photo, user, dispatch)
  }
}
export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER};
}
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchInfo() {
  return function(dispatch) {
    getUser(dispatch);
  }
}
export function fetchProfileInfo(userId) {
  return function(dispatch) {
    getUserProfile(dispatch, userId);
  }
}
//Convention FUNCTIONS
export function fetchConventions(term, otherParams) {
  if (term) {
    return function(dispatch) {
      getAllConventions(term, otherParams, dispatch)
    }
  }
}
export function fetchMyConventions(array) {
  return function(dispatch) {
    getMyConventions(array, dispatch);
  }
}
export function newConvention(data) {
  return function(dispatch) {
    createConvention(data, dispatch);
  }
}

export function fetchSingleConvention(id) {
  return function(dispatch) {
    getConvention(id, dispatch)
  }
}
export function editConvention({convention}, userId) {
  return function(dispatch) {
    edit({convention}, userId, dispatch)
  }
}
