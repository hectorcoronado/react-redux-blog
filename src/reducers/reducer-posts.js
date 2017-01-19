import {
  FETCH_POST,
  FETCH_POSTS
} from '../actions/types';

const INITIAL_STATE = {
  all: [], // all posts
  post: null // individual post for show page
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    /* Whenever we fetch all posts, we want to save our data to the 'all' key in our state object & return a new object to display in posts-index: */
    case FETCH_POSTS:
      return { ...state, all: action.payload.data };
    /* Whenever we fetch one post, we want to save our data to the 'post' key in our state object, & return a new object to display in posts-show: */
    case FETCH_POST:
      return { ...state, post: action.payload.data };
  default:
    return state;
  }
}
