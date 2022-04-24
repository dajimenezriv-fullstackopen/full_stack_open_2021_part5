import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {
  test('updates parent state and calls onSubmit', () => {
    const addBlogMock = jest.fn();
    const { container } = render(<NewBlogForm addBlog={addBlogMock} />);

    const sendButton = screen.getByText('create');
    const inputTitle = container.querySelector('.InputTitle');
    const inputAuthor = container.querySelector('.InputAuthor');

    userEvent.type(inputTitle, 'testing a form...');
    userEvent.type(inputAuthor, 'author_example');
    userEvent.click(sendButton);

    expect(addBlogMock.mock.calls).toHaveLength(1);
    expect(
      JSON.stringify(addBlogMock.mock.calls[0][0]),
    ).toBe(
      JSON.stringify({ title: 'testing a form...', author: 'author_example', url: '' }),
    );
  });
});
