import { FETCH_POSTS } from '../actions/types';

const INITIAL_STATE = {
  all: [], // all posts
  post: null // individual post for show page
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return { ...state, all: action.payload.data };

  default:
    return state;
  }
}
