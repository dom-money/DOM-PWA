import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import IconButton from '../../components/IconButton';

import TwoSquaresIcon from '../../styles/icons/TwoSquaresIcon';
import WithdrawIcon from '../../styles/icons/WithdrawIcon';
import NotificationIcon from '../../styles/icons/NotificationIcon';

export default {
  title: 'Components/Icon Button',
  component: IconButton,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {
      action: `'Icon' Button Clicked`,
    },
  },
} as Meta<typeof IconButton>;

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof IconButton>;
  canvasElement: HTMLElement;
};

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

type Story = StoryObj<typeof IconButton>;

const excludeParams = {
  controls: {
    exclude: [ 'asAnchor', 'href' ],
  },
};

export const SmallButton: Story = {
  args: {
    size: 'small',
    backgroundColor: '#272727',
    children: <TwoSquaresIcon color="#FFFFFF" />,
    ariaLabel: 'Small Button',
  },

  play: playFn,
  parameters: excludeParams,
};

export const MediumButton: Story = {
  args: {
    size: 'medium',
    backgroundColor: '#272727',
    children: <NotificationIcon color="#FFFFFF" />,
    ariaLabel: 'Medium Button',
  },

  play: playFn,
  parameters: excludeParams,
};

export const LargeButton: Story = {
  args: {
    size: 'large',
    backgroundColor: '#020202',
    children: <WithdrawIcon color="#FFFFFF" />,
    ariaLabel: 'Large Button',
  },

  parameters: {
    backgrounds: { default: 'darkAdditional' },
    ...excludeParams,
  },

  play: playFn,
};

export const NotificationButton: Story = {
  args: {
    size: 'medium',
    backgroundColor: '#272727',
    hasNotificationBadge: true,
    children: <NotificationIcon color="#FFFFFF" />,
    ariaLabel: 'Notification Button',
  },

  play: playFn,
  parameters: excludeParams,
};

export const DisabledButton: Story = {
  args: {
    size: 'large',
    backgroundColor: '#020202',
    children: <WithdrawIcon color="#FFFFFF" />,
    disabled: true,
    ariaLabel: 'Disabled Button',
  },

  parameters: {
    backgrounds: { default: 'darkAdditional' },
    ...excludeParams,
  },

  play: (args) => playFn(args, true),
};

export const AsLink: Story = {
  args: {
    size: 'medium',
    backgroundColor: '#272727',
    children: <NotificationIcon color="#FFFFFF" />,
    ariaLabel: 'Medium Link Button',
    asAnchor: true,
    href: '/',
  },

  parameters: {
    controls: {
      exclude: [ 'onClick', 'disabled' ],
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const linkButton = canvas.getByRole('link');

    await waitFor(() => expect(linkButton).toHaveAttribute('href', '/'));
  },
};
