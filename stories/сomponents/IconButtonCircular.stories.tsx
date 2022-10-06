import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof IconButtonCircular>;

const excludeParams = {
  controls: {
    exclude: [
      'href',
    ],
  },
};

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof IconButtonCircular>,
  canvasElement: HTMLElement
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
  };

  // Clicking away to lose focus
  await userEvent.click(canvasElement);
};

const Template: ComponentStory<typeof IconButtonCircular> = (args) =>
  <IconButtonCircular {...args} />;

export const Button = Template.bind({});
Button.args = {
  children: <ArrowDownIcon color="#F8F8F8" opacity="0.3"/>,
  ariaLabel: 'Collapse Container',
};
Button.play = playFn;
Button.parameters = excludeParams;

export const Disabled = Template.bind({});
Disabled.args = {
  children: <ArrowDownIcon color="#F8F8F8" opacity="0.3"/>,
  disabled: true,
  ariaLabel: 'Disabled Button',
};
Disabled.parameters = excludeParams;
Disabled.play = (args) => playFn(args, true);

export const AsLink = Template.bind({});
AsLink.args = {
  children: <GoBackIcon color='#F8F8F8'/>,
  ariaLabel: 'Return to previous page',
  href: '/',
};
AsLink.parameters = {
  controls: {
    exclude: [
      'onClick',
      'disabled',
    ],
  },
};
AsLink.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const linkButton = canvas.getByRole('link');

  await waitFor(() => expect(linkButton).toHaveAttribute('href', '/'));
};
