import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Button from '../../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [ (story) => <div style={{ width: '206px' }}>{ story() }</div> ],
  argTypes: {
    primary: { control: 'boolean' },
    onClick: {
      action: 'Button Clicked',
    },
  },
} as Meta<typeof Button>;

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof Button>;
  canvasElement: HTMLElement;
};

type Story = StoryObj<typeof Button>;

const playFn = async (
    { args, canvasElement }: PlayFnArgs,
    disabled?: boolean,
) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');
  await userEvent.click(button);

  if (disabled) {
    await waitFor(() => expect(args.onClick).not.toHaveBeenCalled());
  } else {
    await waitFor(() => expect(args.onClick).toHaveBeenCalled());
  }

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};

export const Primary: Story = {
  args: {
    label: 'Top Up',
    primary: true,
  },

  play: playFn,
};

export const Default: Story = {
  args: {
    label: 'Send',
  },

  play: playFn,
};

export const Disabled: Story = {
  args: {
    label: 'Send',
    primary: true,
    disabled: true,
  },

  play: (args) => playFn(args, true),
};

export const AsLink: Story = {
  args: {
    label: 'Top Up',
    primary: true,
    asAnchor: true,
    href: '/',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatarLinkButton = canvas.getByRole('link');

    await waitFor(() => expect(avatarLinkButton).toHaveAttribute('href', '/'));
  },
};
