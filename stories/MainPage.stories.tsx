import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPage from '../components/MainPage';

export default {
  title: 'Pages/Main Page',
  component: MainPage,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    walletInactive: { control: 'boolean' },
  },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args) =>
  <MainPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalBalanceAmount: 45725.06,
  walletAmount: 20000.12,
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  totalBalanceAmount: 0,
  walletAmount: 0,
  walletInactive: true,
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: false,
};
