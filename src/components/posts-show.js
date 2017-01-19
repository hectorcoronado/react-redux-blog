import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/*
For a more thorough explanation of code in this file, see:
  posts-index.js
which has a similar structure. Comments here are for code specific to the functionality of this component.

*/

import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    /* this.props.params.id is coming from the URL (see routes.js), we pass it to fetchPost(), which makes the backend request, it resolves with data, our reducer picks it up, and then we can show our individual post */
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push('/');
      });
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
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          /* onDeleteClick is a callback function that we're passing off to another component and we need to make reference to 'this' in it, so we must bind the context.

          If we don't, we get Uncaught TypeError: Cannot read property 'props' of null
          */
          onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
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

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
