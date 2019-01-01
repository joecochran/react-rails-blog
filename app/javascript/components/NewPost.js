import React from 'react';
import axios from 'axios';

import { passCsrfToken } from '../util/helpers';

class NewPost extends React.Component {
  state = {
    title: '',
    body: ''
  }

  componentDidMount() {
    passCsrfToken(document, axios);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const post = {
      post_title: this.state.title,
      post_body: this.state.body,
    };

    axios.post('/api/posts', post).then(() => {
      this.props.history.push('/posts');
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
            <textarea type="text" name="body" placeholder="body" onChange={this.handleChange} ></textarea>
          </div>
          <button>Create Post</button>
        </form>
      </div>
    )
  }
}

export default NewPost;
