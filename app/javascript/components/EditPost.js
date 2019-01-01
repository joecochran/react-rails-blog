import React from 'react';

class EditPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };
  }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <form>
          <input type="text" name="title" value={title} />
          <input type="text" name="body" value={body} />
          <button type="submit">Update Post</button>
        </form>
      </div>
    );
  }
}

export default EditPost;
