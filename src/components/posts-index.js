import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { bindActionCreators } from 'redux'; // not necessary if not doing mapDispatchToProps()

import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  /* React will automatically invoke componentWillMount whenever our component is about to be
  rendered to the DOM for the FIRST TIME.

  It will NOT be called on subsequent renders.
  */
  componentWillMount() {
    this.props.fetchPosts();
  }

  // function to take our posts from state and render them in the component
  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <span className="pull-xs-right">{post.categories}</span>
          <strong>{post.title}</strong>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          {/* Link is a react-router component that works much like an HTML <a> tag, it needs a "to"
            prop with the URL's path extension we need it to navigate to:
          */}
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  /* posts.all is coming from reducer-posts.js; this reducer returns an object with the 'all property to the 'posts' piece of application state */
  return { posts: state.posts.all };
}

/*
function mapDispatchToProps(dispatch) {
  //this gives us access to our ActionCreators and makes them available to this component via:

  //this.props.fetchPosts()

  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(null, mapDispatchToProps)(PostsIndex);

We can use a shortcut for mapDispatchToProps thusly:
*/

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
