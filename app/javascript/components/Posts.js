import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    document.title = 'All Posts';
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
      <table className="w-full text-left table-collapse table-auto">
        <thead>
          <tr>
            <th className="text-sm font-semibold text-grey-darker p-2 pl-0 bg-grey-lightest">Name</th>
            <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Category</th>
            <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Date</th>
            <th className="text-sm font-semibold text-grey-darker p-2 pr-0 bg-grey-lightest" />
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td className="p-2 pl-0 border-t border-grey-light whitespace-no-wrap">
                <Link to={`/admin/posts/${post.id}`} className="text-teal-dark hover:text-teal-darker">{post.title}</Link>
              </td>
              <td className="p-2 border-t border-grey-light text-sm whitespace-no-wrap">
                {post.category.title}
              </td>
              <td className="p-2 border-t border-grey-light text-sm whitespace-no-wrap">
                <time dateTime={post.created_at}>{`${distanceInWordsToNow(post.created_at)} ago`}</time>
              </td>
              <td className="p-2 pr-0 border-t text-right border-grey-light text-xs whitespace-no-wrap">
                <button className="bg-red text-white hover:bg-red-dark font-bold rounded p-2" type="button" onClick={() => this.deletePost(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="container mx-auto">
        <h1 className="mt-6 mb-6">Posts</h1>
        {this.renderAllPosts()}
      </div>
    );
  }
}

export default Posts;
