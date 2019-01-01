import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { passCsrfToken } from '../util/helpers';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    passCsrfToken(document, axios);
    this.getPosts();
  }

  getPosts() {
    axios.get('/api/posts').then((response) => {
      this.setState({ posts: response.data.posts });
    });
  }

  deletePost(id) {
    axios.delete(`/api/posts/${id}`).then(() => {
      this.getPosts();
    });
  }

  renderAllPosts() {
    const { posts } = this.state;
    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <button type="button" onClick={() => this.deletePost(post.id)}>del</button>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Posts</h1>
        {this.renderAllPosts()}
      </div>
    );
  }
}

export default Posts;
