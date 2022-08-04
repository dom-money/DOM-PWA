import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../components/Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isNotificationPresent: { control: 'boolean' },
    profileOnClick: { action: 'onProfileClick' },
    notificationsOnClick: { action: 'onNotificationsClick' },
  },
  decorators: [
    (story) => (
      <div style={{
        padding: '2rem',
        backgroundColor: '#1F1F1F',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
      }}>
        {story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) =>
  <Header {...args} />;

export const WithNotification = Template.bind({});
WithNotification.args = {
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: true,
};

export const WithoutNotification = Template.bind({});
WithoutNotification.args = {
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
};
