import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Header from '../../components/Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    profileOnClick: {
      action: `'Profile' Button Clicked`,
    },
    notificationsOnClick: {
      action: `'Notifications' Button Clicked`,
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (story) => (
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#1F1F1F',
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        { story() }
      </div>
    ),
  ],
} as Meta<typeof Header>;

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof Header>;
  canvasElement: HTMLElement;
};

const playFn = async ({ args, canvasElement }: PlayFnArgs) => {
  const canvas = within(canvasElement);
  const avatarButton = canvas.getByRole('button', { name: 'Profile' });
  const notificationsButton = canvas.getByRole(
      'button',
      { name: 'Notifications' },
  );

  await userEvent.click(avatarButton);
  await waitFor(() => expect(args.profileOnClick).toHaveBeenCalled());

  await userEvent.click(notificationsButton);
  await waitFor(() => expect(args.notificationsOnClick).toHaveBeenCalled());

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};

type Story = StoryObj<typeof Header>;

export const WithNotification: Story = {
  args: {
    avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
    userName: 'John Doe',
    isNotificationPresent: true,
  },

  play: playFn,
};

export const WithoutNotification: Story = {
  args: {
    avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
    userName: 'John Doe',
  },

  play: playFn,
};
