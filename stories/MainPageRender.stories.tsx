import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPageRender from '../components/MainPageRender';

export default {
  title: 'Pages/Main Page',
  component: MainPageRender,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MainPageRender>;

const Template: ComponentStory<typeof MainPageRender> = (args) =>
  <MainPageRender {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalBalanceAmount: 45725.06,
  walletAmount: 20000.12,
  userName: 'John Doe',
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: true,
};

export const TextAvatar = Template.bind({});
TextAvatar.args = {
  totalBalanceAmount: 45725.06,
  walletAmount: 20000.12,
  userName: 'John Doe',
  isNotificationPresent: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  totalBalanceAmount: 0,
  walletAmount: 0,
  userName: 'John Doe',
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: false,
};
