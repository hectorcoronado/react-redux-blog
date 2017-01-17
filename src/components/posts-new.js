import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { createPosts } from '../actions/index';

class PostsNew extends Component {
  render() {
    /* handleSubmit is a helper made availalbe by reduxForm

    fields: {title, categories, content} = this.props is the same as e.g. declaring:
    title = this.props.fields.title
    */
    const{ fields: { title, categories, content }, handleSubmit } = this.props;
    // console.log(title); // this shows us all the available handlers on this object
    return (
      /* We're passing an ActionCreator createPosts to handleSubmit. If the form is valid, it
      invokes our ActionCreator, passing in the form's content as props, which is why it is
      declared that way in ./actions/index */
      <form onSubmit={handleSubmit(this.props.createPosts)}>
        <h3>Create a New Post:</h3>

        <div className="form-group">
          <label>Title</label>
          {/* {...title} below destructures all the properties on the title object, so e.g. the onChange
          method that we get from reduxForm is available as title.onChange() */}
          <input type="text" className="form-control" {...title}/>
        </div>

        <div className="form-group">
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

/* whenever a user changes an input on our form, the category we assign it to will be updated on our global state object.

ReduxForm (like the connect() function) also gives us access to helper methods on this.props inside of this component.

It also makes the fields available as this.props.fiels.someKey

After the form config object, we can pass mapStateToProps and mapDispatchToProps as the 2nd and 3rd arguments of reduxForm.
*/
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content']
}, null, { createPosts })(PostsNew);
