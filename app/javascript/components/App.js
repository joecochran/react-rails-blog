import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import Posts from './Posts';
import NewPost from './NewPost';
import Post from './Post';
import '../stylesheets/App.scss';

function App() {
  return (
    <div>
      <nav className="bg-teal p-6">
        <div className="container mx-auto">
          <ul className="list-reset flex">
            <li className="mr-6"><NavLink to="/admin" className="text-teal-lightest">Dashboard</NavLink></li>
            <li className="mr-6"><NavLink to="/admin/posts" className="text-teal-lightest">Posts</NavLink></li>
            <li className="mr-6"><NavLink to="/admin/new_post" className="text-teal-lightest">New Post</NavLink></li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path="/admin" component={Home} />
        <Route exact path="/admin/posts" component={Posts} />
        <Route exact path="/admin/posts/:id" component={Post} />
        <Route exact path="/admin/new_post" component={NewPost} />
      </Switch>
    </div>
  );
}

export default App;
