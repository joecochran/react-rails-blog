import React from 'react';
import axios from 'axios';
import { distanceInWordsToNow } from 'date-fns';
import { passCsrfToken } from '../util/helpers';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }


  componentDidMount() {
    passCsrfToken(document, axios);

    const { id } = this.props.match.params;

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
        <p>{post.body}</p>
      </article>
    );
  }
}

export default Post;
