import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPageRender from '../components/MainPageRender';

export default {
  title: 'Pages/Main Page',
  component: MainPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
  argTypes: {
    walletAmount: {
      type: { name: 'number', required: true },
      description: 'Wallet Balance Amount',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    wealthAmount: {
      type: { name: 'number', required: true },
      description: 'Wealth Balance Amount',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    profit: {
      type: { name: 'number', required: false },
      description: 'Profit Value',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    profitPercentage: {
      type: { name: 'number', required: false },
      description: 'Profit Percentage Value',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 0.01,
      },
    },
    averageAPY: {
      type: { name: 'number', required: false },
      description: 'Average Annual Percentage Yield Value',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    userName: {
      type: { name: 'string', required: true },
      description: 'User\'s name',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    avatarImageURL: {
      type: { name: 'string', required: false },
      description: 'URL to avatar image',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    isNotificationPresent: {
      type: { name: 'boolean', required: false },
      description: 'Is there a notification present?',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
  },
} as ComponentMeta<typeof MainPageRender>;

const Template: ComponentStory<typeof MainPageRender> = (args) =>
  <MainPageRender {...args} />;

export const Default = Template.bind({});
Default.args = {
  walletAmount: 20000.12,
  wealthAmount: 25724.94,
  profit: 600,
  profitPercentage: 0.1,
  averageAPY: 13,
  userName: 'John Doe',
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: true,
};

export const TextAvatar = Template.bind({});
TextAvatar.args = {
  walletAmount: 20000.12,
  wealthAmount: 25724.94,
  profit: 600,
  profitPercentage: 0.1,
  averageAPY: 13,
  userName: 'John Doe',
  isNotificationPresent: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  walletAmount: 0,
  wealthAmount: 0,
  userName: 'John Doe',
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: false,
};
