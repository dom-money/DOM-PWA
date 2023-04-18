import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { renderWithTheme } from '../utils';

import Header from '../../components/Header';

describe('Header', () => {
  test('correctly renders with default props', () => {
    renderWithTheme(<Header userName='Anonymous User' />);

    const avatarButton = screen.getByRole('button', { name: 'Profile' });
    const userInitials = screen.getByText('AU');
    const notificationsBadge = screen.queryByTestId('notifications-badge');

    expect(avatarButton).toHaveTextContent('AU');
    expect(avatarButton).toContainElement(userInitials);
    expect(userInitials).toBeVisible();

    expect(notificationsBadge).not.toBeInTheDocument();
  });

  test('displays provided avatar image', () => {
    renderWithTheme(
        <Header
          userName='Jane Doe'
          avatarImageURL='https://randomuser.me/api/portraits/women/90.jpg'
        />,
    );

    const avatarButton = screen.getByRole('button', { name: 'Profile' });
    const image = screen.getByRole('img');

    expect(avatarButton).toContainElement(image);
    expect(image).toHaveAttribute('src', 'https://randomuser.me/api/portraits/women/90.jpg');
  });

  test('has username in alt text on avatar image', () => {
    renderWithTheme(
        <Header
          userName='Jane Doe'
          avatarImageURL='https://randomuser.me/api/portraits/women/90.jpg'
        />,
    );

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('alt', 'Jane Doe\'s Avatar');
  });

  test('renders "Avatar" and "Notifications" Buttons', () => {
    renderWithTheme(<Header userName='Anonymous User' />);

    const avatarButton = screen.getByRole('button', { name: 'Profile' });
    const notificationsButton =
      screen.getByRole('button', { name: 'Notifications' });

    expect(avatarButton).toBeVisible();
    expect(notificationsButton).toBeVisible();
  });

  test('Buttons call onClick handlers', async () => {
    const user = userEvent.setup();

    const mockProfileClickHandler = jest.fn();
    const mockNotificationsClickHandler = jest.fn();

    renderWithTheme(
        <Header
          userName='Anonymous User'
          profileOnClick={mockProfileClickHandler}
          notificationsOnClick={mockNotificationsClickHandler}
        />,
    );

    const avatarButton = screen.getByRole('button', { name: 'Profile' });

    await user.click(avatarButton);

    expect(mockProfileClickHandler).toBeCalledTimes(1);


    const notificationsButton =
      screen.getByRole('button', { name: 'Notifications' });

    await user.click(notificationsButton);

    expect(mockNotificationsClickHandler).toBeCalledTimes(1);
  });

  test(`displays notification badge in "Notifications" Button with
  isNotificationPresent={true} prop`, () => {
    renderWithTheme(<Header userName='Anonymous User' isNotificationPresent />);

    const notificationsButton =
      screen.getByRole('button', { name: 'Notifications' });
    const notificationsBadge = screen.getByTestId('notifications-badge');

    expect(notificationsBadge).toBeVisible();
    expect(notificationsButton).toContainElement(notificationsBadge);
  });

  test('renders correctly', () => {
    const HeaderComponent =
      <Header
        userName='Jane Doe'
        avatarImageURL='https://randomuser.me/api/portraits/women/90.jpg'
        isNotificationPresent
      />;

    const tree = renderer
        .create(HeaderComponent)
        .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
