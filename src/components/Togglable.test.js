import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Toggable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable hideLabel="hide" showLabel="show">
        <div className="TestDiv">
          togglable content
        </div>
      </Togglable>,
    ).container;
  });

  test('renders its children', () => {
    screen.findByText('togglable content');
  });

  test('toggleVisibility', () => {
    const showButton = screen.getByText('show');
    expect(container.querySelector('.TogglableContent')).toBe(null);
    userEvent.click(showButton);
    expect(container.querySelector('.TogglableContent')).not.toBe(null);
    const hideButton = screen.getByText('hide');
    userEvent.click(hideButton);
    expect(container.querySelector('.TogglableContent')).toBe(null);
  });
});
