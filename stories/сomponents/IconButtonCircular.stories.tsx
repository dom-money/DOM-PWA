import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import IconButtonCircular from '../../components/IconButtonCircular';

import ArrowDownIcon from '../../styles/icons/ArrowDownIcon';
import GoBackIcon from '../../styles/icons/GoBackIcon';

export default {
  title: 'Components/Icon Button Circular',
  component: IconButtonCircular,
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
  argTypes: {
    onClick: {
      action: `'Icon Button Circular' Clicked`,
    },
  },
} as Meta<typeof IconButtonCircular>;

const excludeParams = {
  controls: {
    exclude: [ 'href' ],
  },
};

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof IconButtonCircular>;
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

type Story = StoryObj<typeof IconButtonCircular>;

export const Button: Story = {
  args: {
    children: <ArrowDownIcon color="#F8F8F8" opacity="0.3" />,
    ariaLabel: 'Collapse Container',
  },

  play: playFn,
  parameters: excludeParams,
};

export const Disabled: Story = {
  args: {
    children: <ArrowDownIcon color="#F8F8F8" opacity="0.3" />,
    disabled: true,
    ariaLabel: 'Disabled Button',
  },

  parameters: excludeParams,
  play: (args) => playFn(args, true),
};

export const AsLink: Story = {
  args: {
    children: <GoBackIcon color="#F8F8F8" />,
    ariaLabel: 'Return to previous page',
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
