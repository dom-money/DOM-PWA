import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof IconButton>;

type PlayFnArgs = {
  args: React.ComponentPropsWithoutRef<typeof IconButton>,
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

const Template: ComponentStory<typeof IconButton> = (args) =>
  <IconButton {...args} />;

const excludeParams = {
  controls: {
    exclude: [
      'asAnchor',
      'href',
    ],
  },
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  size: 'small',
  backgroundColor: '#272727',
  children: <TwoSquaresIcon color='#FFFFFF'/>,
  ariaLabel: 'Small Button',
};
SmallButton.play = playFn;
SmallButton.parameters = excludeParams;

export const MediumButton = Template.bind({});
MediumButton.args = {
  size: 'medium',
  backgroundColor: '#272727',
  children: <NotificationIcon color='#FFFFFF'/>,
  ariaLabel: 'Medium Button',
};
MediumButton.play = playFn;
MediumButton.parameters = excludeParams;

export const LargeButton = Template.bind({});
LargeButton.args = {
  size: 'large',
  backgroundColor: '#020202',
  children: <WithdrawIcon color='#FFFFFF'/>,
  ariaLabel: 'Large Button',
};
LargeButton.parameters = {
  backgrounds: { default: 'darkAdditional' },
  ...excludeParams,
};
LargeButton.play = playFn;

export const NotificationButton = Template.bind({});
NotificationButton.args = {
  size: 'medium',
  backgroundColor: '#272727',
  hasNotificationBadge: true,
  children: <NotificationIcon color='#FFFFFF'/>,
  ariaLabel: 'Notification Button',
};
NotificationButton.play = playFn;
NotificationButton.parameters = excludeParams;

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  size: 'large',
  backgroundColor: '#020202',
  children: <WithdrawIcon color='#FFFFFF'/>,
  disabled: true,
  ariaLabel: 'Disabled Button',
};
DisabledButton.parameters = {
  backgrounds: { default: 'darkAdditional' },
  ...excludeParams,
};
DisabledButton.play = (args) => playFn(args, true);

export const AsLink = Template.bind({});
AsLink.args = {
  size: 'medium',
  backgroundColor: '#272727',
  children: <NotificationIcon color='#FFFFFF'/>,
  ariaLabel: 'Medium Link Button',
  asAnchor: true,
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
