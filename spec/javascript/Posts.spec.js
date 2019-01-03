import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import Posts from 'components/Posts';

configure({ adapter: new Adapter() });

// configure mock route component with call via axios
const mock = new MockAdapter(Axios);
mock.onGet('/api/posts').reply(200, {
  posts: [
    {
      id: 1,
      title: 'Foo',
      body: 'bar',
    },
  ],
});
// mock.onDelete('/api/posts/1').reply(200);

// add csrf meta tag
const meta = document.createElement('meta');
meta.setAttribute('name', 'csrf-token');
meta.content = 'fooo';
document.querySelector('head').appendChild(meta);

describe('home component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Posts />);
    expect(wrapper).toMatchSnapshot();
  });
});
