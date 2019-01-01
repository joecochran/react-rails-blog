import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { distanceInWordsToNow } from 'date-fns';
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
      <div>
        {posts.map(post => (
          <article className="post" key={post.id}>
            <header className="post__header">
              <Link to={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
              <time dateTime={post.created_at}>
                {`${distanceInWordsToNow(post.created_at)} ago`}
              </time>
              <div className="post__menu">
                <button type="button" onClick={() => this.deletePost(post.id)}>del</button>
              </div>
            </header>
            <div>
              <Markdown>{post.body}</Markdown>
            </div>
          </article>
        ))}
      </div>
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
