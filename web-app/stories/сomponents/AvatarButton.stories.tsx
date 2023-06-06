import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import AvatarButton from '../../components/AvatarButton';

export default {
  title: 'Components/Avatar Button',
  component: AvatarButton,
  argTypes: {
    onClick: {
      action: `'Avatar' Button Clicked`,
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof AvatarButton>;

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof AvatarButton>;
  canvasElement: HTMLElement;
};

const playFn = async ({ args, canvasElement }: PlayFnArgs) => {
  const canvas = within(canvasElement);
  const avatarButton = canvas.getByRole('button');
  await userEvent.click(avatarButton);

  await waitFor(() => expect(args.onClick).toHaveBeenCalled());

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};

type Story = StoryObj<typeof AvatarButton>;

export const Image: Story = {
  args: {
    imageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
    userName: 'John Doe',
  },

  play: playFn,
};

export const Text: Story = {
  args: {
    userName: 'John Doe',
  },

  play: playFn,
};

export const PhoneNumber: Story = {
  args: {
    userName: '+1-555-555-1234',
  },

  play: playFn,
};
