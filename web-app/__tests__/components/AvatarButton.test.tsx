import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../utils';

import AvatarButton from '../../components/AvatarButton';

describe('Avatar Button', () => {
  test('renders provided image', () => {
    renderWithTheme(
        <AvatarButton
          imageURL='https://randomuser.me/api/portraits/women/90.jpg'
          userName='John Doe'
        />,
    );

    const avatarButton = screen.getByRole('button');
    const image = screen.getByRole('img');

    expect(avatarButton).toContainElement(image);
    expect(image).toHaveAttribute('src', 'https://randomuser.me/api/portraits/women/90.jpg');
  });

  test('has correct alt text on avatar image', () => {
    renderWithTheme(
        <AvatarButton
          imageURL='https://randomuser.me/api/portraits/women/90.jpg'
          userName='John Doe'
        />,
    );

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('alt', 'John Doe\'s Avatar');
  });

  test('calls onClick', async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();
    renderWithTheme(
        <AvatarButton
          imageURL='https://randomuser.me/api/portraits/women/90.jpg'
          userName='John Doe'
          onClick={ mockClickHandler }
        />,
    );

    const avatarButton = screen.getByRole('button');

    await user.click(avatarButton);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  test('displays user\'s initials, when no image is provided', () => {
    renderWithTheme(
        <AvatarButton
          imageURL=''
          userName='John Doe'
        />,
    );

    const avatarButton = screen.getByRole('button');
    const text = screen.getByText('JD');

    expect(avatarButton).toHaveTextContent('JD');
    expect(avatarButton).toContainElement(text);
    expect(text).toBeVisible();
  });

  test('displays correct user\'s initials from email', () => {
    renderWithTheme(
        <AvatarButton
          imageURL=''
          userName='bobby.fisher@gmail.com'
        />,
    );

    const avatarButton = screen.getByRole('button');
    const text = screen.getByText('bf');

    expect(avatarButton).toHaveTextContent('bf');
    expect(avatarButton).toContainElement(text);
    expect(text).toBeVisible();
  });

  test('displays user\'s initials in uppercase', () => {
    renderWithTheme(
        <AvatarButton
          imageURL=''
          userName='bobby.fisher@gmail.com'
        />,
    );

    const text = screen.getByText('bf');

    expect(text).toHaveStyle(`text-transform: uppercase`);
  });
});
