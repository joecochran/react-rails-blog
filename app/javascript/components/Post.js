import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { distanceInWordsToNow } from 'date-fns';
import { passCsrfToken } from '../util/helpers';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        body: '',
      },
    };
  }

  componentDidMount() {
    passCsrfToken(document, axios);
    const { match } = this.props;
    const { id } = match.params;

    axios.get(`/api/posts/${id}`).then((response) => {
      this.setState({ post: response.data.post });
    });
  }

  render() {
    const { post } = this.state;
    return (
      <article className="container">
        <h1>{post.title}</h1>
        <p>
          {distanceInWordsToNow(post.created_at)}
          {' '}
ago
        </p>
        <div>
          <Markdown>{post.body}</Markdown>
        </div>

      </article>
    );
  }
}
Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
