import React, { Component } from 'react';

class Home extends Component {
  componentDidMount() {
    document.title = 'Dashboard';
  }

  render() {
    return (
      <div className="container mx-auto">
        <h1 className="mb-6 mt-6">Dashboard</h1>
      </div>
    );
  }
}

export default Home;
