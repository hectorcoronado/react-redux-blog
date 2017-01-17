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
        List of blog posts
      </div>
    );
  }
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

export default connect(null, { fetchPosts })(PostsIndex);
