import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { passCsrfToken } from '../util/helpers';

class Posts extends React.Component {
  state = {
    posts: []
  }

  getPosts = () => {
    axios.get('/api/posts').then(response => {
      this.setState({ posts: response.data.posts });
    })
  }

  deletePost = (id) => {
    axios.delete('/api/posts/' + id).then(response => {
      this.getPosts();
    })
  }

  componentDidMount() {
    passCsrfToken(document, axios);
    this.getPosts();
  }

  renderAllPosts = () => {
    return (
      <ul>
        {this.state.posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <button onClick={() => this.deletePost(post.id)}>del</button>
          </li>
        ))}
      </ul>
    )
  };

  render() {
    return (
      <div className="container">
        <h1>Posts</h1>
        {this.renderAllPosts()}
      </div>
    )
  }
}

export default Posts;
