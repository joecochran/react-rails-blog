import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { passCsrfToken } from '../util/helpers';

class Post extends Component {
  state = {
    title: '',
    body: '',
  };

  componentDidMount() {
    passCsrfToken(document, axios);
    document.title = 'Edit Post';
    const { match } = this.props;
    const { id } = match.params;

    axios.get(`/api/posts/${id}`).then((response) => {
      this.setState({ title: response.data.post.title, body: response.data.post.body });
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    const { title, body } = this.state;
    const { history } = this.props;
    const { match } = this.props;
    const { id } = match.params;
    event.preventDefault();

    const post = {
      title,
      body,
    };

    axios.put(`/api/posts/${id}`, post).then(() => {
      history.push('/admin/posts');
    });
  }

  render() {
    const { title, body } = this.state;
    return (
      <div className="container mx-auto">
        <h1 className="mb-6 mt-6">Edit Post</h1>
        <div className="flex">
          <div className="w-1/2 mr-3">
            <form onSubmit={e => this.handleSubmit(e)} className="">
              <div className="mb-6">
                <label htmlFor="title" className="block text-grey-darker text-sm font-bold mb-2">
                  Post Title
                </label>
                <input id="title" type="text" name="title" onChange={this.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" value={title} />
              </div>
              <div className="mb-6">
                <label htmlFor="body" className="block text-grey-darker text-sm font-bold mb-2">Post Body</label>
                <textarea rows="25" id="body" type="text" name="body" onChange={this.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" value={body} />
              </div>
              <button type="submit" className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Post</button>
            </form>
          </div>
          <div className="w-1/2 ml-3">
            <div className="block text-grey-darker text-sm font-bold mb-2 ml-4">Preview</div>
            <div className="p-4 border rounded markdown">
              <Markdown>{`# ${title}`}</Markdown>
              <Markdown>
                {body}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Post;
