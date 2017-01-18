import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { createPosts } from '../actions/index';

class PostsNew extends Component {
  /* The following gives us access to this.context.router, checking through ALL of this component's
  parents for it */
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    /* We're passing an ActionCreator createPosts to handleSubmit. If the form is valid, it
    invokes our ActionCreator, passing in the form's content as props, which is why it is
    declared that way in ./actions/index */
    this.props.createPosts(props)
      .then(() => {
        /* Only after blog post has been created, navigate user to index. We navigate by calling
        this.context.router.push with the new path to navigate to */
        this.context.router.push('/');
      });
  }

  render() {
    /* handleSubmit is a helper made availalbe by reduxForm

    fields: {title, categories, content} = this.props is the same as e.g. declaring:
    title = this.props.fields.title
    */
    const{ fields: { title, categories, content }, handleSubmit } = this.props;
    // console.log(title); // this shows us all the available handlers on this object
    return (
      /* whenever handleSumbit is called, it passes props from our form (title, categories, and
      content), so we pass them on to the createPosts ActionCreator */
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post:</h3>

        {/* reduxForm gives us the invalid property; we add the 'has-danger' class if the input has
        been touched and is invalid, otherwise we leave class as 'form-group' */}
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          {/* {...title} below destructures all the properties on the title object, so e.g. the onChange
          method that we get from reduxForm is available as title.onChange() */}
          <input type="text" className="form-control" {...title}/>
          {/* title.error is added to the title key by the validate function */}
          <div className="text-help">
            {/* reduxForm gives us title.touched as helper, it defaults to false until a user
            interacts with the input field */}
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// Validation happens OUTSIDE of PostsNew; reduxForm is a higher order component
function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }

  if (!values.categories) {
    errors.categories  = 'Enter categories'
  }

  if (!values.content) {
    errors.content = 'Enter content'
  }

  /* if the object returned has a key that matches one of our field names below, and that key has a
  truthy value attached to it, reduxForm assumes the form is not valid, and adds properties to our fields configuration object

  const{ fields: { title, categories, content }, handleSubmit } = this.props;

  declared in the component above. */
  return errors;
}

/* whenever a user changes an input on our form, the category we assign it to will be updated on
our global state object.

ReduxForm (like the connect() function) also gives us access to helper methods on this.props inside
of this component.

It also makes the fields available as this.props.fiels.someKey

After the form config object, we can pass mapStateToProps and mapDispatchToProps as the 2nd and 3rd
arguments of reduxForm.
*/
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPosts })(PostsNew);
