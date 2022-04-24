import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'title',
    author: 'daniel',
    url: 'this_url',
    likes: 0,
    user: {
      username: 'Testing',
    },
  };

  beforeEach(() => {
    render(<Blog blog={blog} />);
  });

  test('renders content', () => {
    // getByText looks for an element that has exactly the text that it has as parameter
    const element = screen.getByText(`${blog.title} ${blog.author}`);
    screen.getByText(blog.title, { exact: false });
    // it's not needed because the getByText throws an exception if doesn't find blog.title
    expect(element).toBeDefined();
    // shows the content of the html or an element
    // screen.debug();
    // screen.debug(element);

    expect(screen.queryByText('likes', { exact: false })).toBe(null);
    expect(screen.queryByText(blog.url, { exact: false })).toBe(null);
  });

  test('all content render when view clicked', () => {
    const button = screen.getByText('view');
    userEvent.click(button);
    expect(screen.queryByText('likes', { exact: false })).not.toBe(null);
    expect(screen.queryByText(blog.url, { exact: false })).not.toBe(null);
  });

  test('like button is clickled twice', () => {
    const button = screen.getByText('view');
    userEvent.click(button);
    const likeButton = screen.getByText('like');
    screen.getByText('0', { exact: false });
    userEvent.click(likeButton);
    // we can't use a mock, neither call the function of likeButton
    // because the blog is not saved in the database
    // and we are not using the like function as a prop, so cannot be used a mock
  });
});
