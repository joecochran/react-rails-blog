import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { passCsrfToken } from '../util/helpers';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    passCsrfToken(document, axios);
    document.title = 'New Post';
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
      history.push('/admin/posts');
    });
  }

  render() {
    return (
      <div className="container mx-auto">
        <h1 className="mb-6 mt-6">New Post</h1>
        <div className="flex">
          <div className="w-1/2 mr-3">
            <form onSubmit={e => this.handleSubmit(e)} className="">
              <div className="mb-6">
                <label htmlFor="title" className="block text-grey-darker text-sm font-bold mb-2">
                  Post Title
                </label>
                <input id="title" type="text" name="title" onChange={this.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="body" className="block text-grey-darker text-sm font-bold mb-2">Post Body</label>
                <textarea rows="25" id="body" type="text" name="body" onChange={this.handleChange} className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <button type="submit" className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Post</button>
            </form>
          </div>
          <div className="w-1/2 ml-3">
            <div className="block text-grey-darker text-sm font-bold mb-2 ml-4">Preview</div>
            <div className="p-4 border rounded markdown">
              <Markdown>{`# ${this.state.title}`}</Markdown>
              <Markdown>
                {this.state.body}
              </Markdown>
            </div>
          </div>
        </div>
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
