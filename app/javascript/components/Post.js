import React from 'react';
import axios from 'axios';
import { distanceInWordsToNow } from 'date-fns';
import { passCsrfToken } from '../util/helpers';


class Post extends React.Component {
  state = {
    post: {}
  }

  componentDidMount() {
    passCsrfToken(document, axios);

    const { id } = this.props.match.params;

    axios.get('/api/posts/' + id).then(response => {
      console.log(response.data.post);
      this.setState({ post: response.data.post });
    });
  }
  
  render() {
    return (
      <article className="container">
        <h1>{this.state.post.title}</h1>
        <p>{distanceInWordsToNow(this.state.post.created_at)} ago</p>
        <p>{this.state.post.body}</p>
      </article>
    )
  }
}

export default Post;
