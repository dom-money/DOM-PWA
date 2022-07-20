import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IconButton from '../components/IconButton';

import TwoSquaresIcon from '../styles/icons/TwoSquaresIcon';
import SignInIcon from '../styles/icons/SignInIcon';
import NotificationIcon from '../styles/icons/NotificationIcon';

export default {
  title: 'Components/Icon Button',
  component: IconButton,
  argTypes: {
    size: {
      options: [ 'small', 'medium', 'large' ],
      control: { type: 'select' },
    },
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
    hasNotificationBadge: { control: 'boolean' },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) =>
  <IconButton {...args} />;

export const SmallButton = Template.bind({});
SmallButton.args = {
  size: 'small',
  backgroundColor: '#272727',
  children: <TwoSquaresIcon color='#FFFFFF'/>,
};

export const MediumButton = Template.bind({});
MediumButton.args = {
  size: 'medium',
  backgroundColor: '#272727',
  children: <NotificationIcon color='#FFFFFF'/>,
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  size: 'large',
  backgroundColor: '#020202',
  children: <SignInIcon color='#FFFFFF'/>,
};
LargeButton.parameters = {
  backgrounds: { default: 'darkAdditional' },
};

export const NotificationButton = Template.bind({});
NotificationButton.args = {
  size: 'medium',
  backgroundColor: '#272727',
  hasNotificationBadge: true,
  children: <NotificationIcon color='#FFFFFF'/>,
};
