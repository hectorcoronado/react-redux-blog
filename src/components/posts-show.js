import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
For a more thorough explanation of code in this file, see:
  posts-index.js
which has a similar structure. Comments here are for code specific to the functionality of this component.

*/

import { fetchPost } from '../actions/index';

class PostsShow extends Component {
  componentWillMount() {
    /* this.props.params.id is coming from the URL (see routes.js), we pass it to fetchPost(), which makes the backend request, it resolves with data, our reducer picks it up, and then we can show our individual post */
    this.props.fetchPost(this.props.params.id);
  }

  render() {
    const { post } = this.props;
    /* our ActionCreator makes an axios request to the API, which takes time; our component will render before the promise resolves, so we need to handle the lag in response time by waiting for

    this.props.post

    to actually exist & be defined:
    */
    if(!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
