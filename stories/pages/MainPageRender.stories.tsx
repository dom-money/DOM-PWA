import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPageRender from '../../components/MainPageRender';
import { Closed } from '../сomponents/RecentTransactions.stories';

export default {
  title: 'Pages/Main Page',
  component: MainPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
    docs: {
      inlineStories: false,
      iframeHeight: 926,
    },
  },
  argTypes: {
    totalBalanceAmount: {
      type: { name: 'string', required: true },
      description: 'Total Balance Amount',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    walletAmount: {
      type: { name: 'string', required: true },
      description: 'Wallet Balance Amount',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    wealthAmount: {
      type: { name: 'string', required: true },
      description: 'Wealth Balance Amount',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    yieldValue: {
      type: { name: 'number', required: false },
      description: 'Yield Value',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    yieldValuePercentage: {
      type: { name: 'number', required: false },
      description: 'Yield Percentage Value',
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
    transactions: {
      control: 'array',
      description: 'Array of transactions',
      table: {
        defaultValue: {
          summary: '[]',
        },
        type: {
          summary: 'array',
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
    scanQROnClick: {
      action: `'Scan QR' Button Clicked`,
      table: {
        disable: true,
      },
    },
    onLoadMoreTransactions: {
      action: `'Load More Transactions' Action`,
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof MainPageRender>;

const Template: ComponentStory<typeof MainPageRender> = (args) =>
  <MainPageRender {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalBalanceAmount: '45725.06',
  walletAmount: '20000.12',
  wealthAmount: '25724.94',
  yieldValue: 600,
  yieldValuePercentage: 0.1,
  averageAPY: 13,
  transactions: Closed.args?.transactions,
  userName: 'John Doe',
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: true,
};

export const TextAvatar = Template.bind({});
TextAvatar.args = {
  totalBalanceAmount: '45725.06',
  walletAmount: '20000.12',
  wealthAmount: '25724.94',
  yieldValue: 600,
  yieldValuePercentage: 0.1,
  averageAPY: 13,
  transactions: Closed.args?.transactions,
  userName: 'John Doe',
  isNotificationPresent: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  totalBalanceAmount: '0',
  walletAmount: '0',
  wealthAmount: '0',
  userName: 'John Doe',
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
  isNotificationPresent: false,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  userName: 'John Doe',
  avatarImageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
};
Loading.parameters = {
  controls: {
    exclude: [
      'walletAmount',
      'wealthAmount',
      'yieldValue',
      'yieldValuePercentage',
      'averageAPY',
      'transactions',
      'isNotificationPresent',
      'isLoading',
    ],
  },
};
