import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    document.title = 'All Categories';
    this.getCategories();
  }

  getCategories() {
    axios.get('/api/categories').then((response) => {
      this.setState({ categories: response.data });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="container mx-auto">
        <h1 className="mt-6 mb-6">Categories</h1>
        <ul>
          {categories.map(category => (
            <li key={category.id}>{category.title}</li>
          ))}
        </ul>

      </div>
    );
  }
}

export default Categories;
