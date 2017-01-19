import axios from 'axios';

import {
  FETCH_POST,
  FETCH_POSTS,
  CREATE_POSTS,
  DELETE_POST
} from './types';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=allhailtheimponderablewhatever'

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  /*
  This ActionCreator fetches the posts from the above URL to display them in our PostsIndex component.

  Axios will return a PROMISE, and attach it to the payload key on the object below. The payload
  will, at that moment, be a promise, but our redux-promise middleware will stop the Action
  entirely until the AJAX/axios request finishes; it then dispatches a new Action with the SAME
  TYPE, but with the payload of the resolved request and passes it on to our reducers as data.

  In our reducer, the resolved data will be available on:

  action.payload.data
  */

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

/* 'props' below is getting passed in by the form in ./components/posts-new.js */
export function createPosts(props) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

  return {
    type: CREATE_POSTS,
    payload: request
  };
}

// This gets called with the specific id of the post we're getting:
export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: DELETE_POST,
    payload: request
  };
}
