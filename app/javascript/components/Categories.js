import React, { Component } from 'react';
import axios from 'axios';
import { passCsrfToken } from '../util/helpers';

class Categories extends Component {
  state = {

  };

  componentDidMount() {
    document.title = 'All Categories';
  }

  render() {
    return (
      <div className="container mx-auto">
        <h1 className="mt-6 mb-6">Categories</h1>
      </div>
    );
  }
}

export default Categories;
