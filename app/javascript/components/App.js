import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Home from './Home';
import Posts from './Posts';
import NewPost from './NewPost';
import Post from './Post';
import '../stylesheets/App.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="nav">
          <div className="container">
            <ul className="nav__list">
              <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
              <li className="nav__item"><Link to="/posts" className="nav__link">Posts</Link></li>
              <li className="nav__item"><Link to="/new_post" className="nav__link">New Post</Link></li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={Post} />
          <Route exact path="/new_post" component={NewPost} />
        </Switch>
      </div>
    )
  }
}

export default App;
