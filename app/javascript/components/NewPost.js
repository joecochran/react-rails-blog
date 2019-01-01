import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { passCsrfToken } from '../util/helpers';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }

  componentDidMount() {
    passCsrfToken(document, axios);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { title, body } = this.state;
    const { history } = this.props;
    event.preventDefault();

    const post = {
      post_title: title,
      post_body: body,
    };

    axios.post('/api/posts', post).then(() => {
      history.push('/posts');
    });
  }

  render() {
    return (
      <div className="container">
        <h1>New Post</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <input type="text" name="title" placeholder="title" onChange={this.handleChange} />
          </div>
          <div>
            <textarea type="text" name="body" placeholder="body" onChange={this.handleChange} />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  }
}

NewPost.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default NewPost;
