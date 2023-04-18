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
    controls: {
      exclude: [ 'isLoading' ],
    },
  },
  argTypes: {
    isLoading: {
      table: {
        disable: true,
      },
    },
    totalBalanceAmount: {
      type: {
        name: 'string', required: true,
      },
    },
    walletAmount: {
      type: {
        name: 'string', required: true,
      },
    },
    wealthAmount: {
      type: {
        name: 'string', required: true,
      },
    },
    scanQROnClick: {
      action: `'Scan QR' Button Clicked`,
    },
    onLoadMoreTransactions: {
      action: `'Load More Transactions' Action`,
    },
  },
} as ComponentMeta<typeof MainPageRender>;

const Template: ComponentStory<typeof MainPageRender> = (args) =>
  <MainPageRender { ...args } />;

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
      'isLoadingMoreTransactions',
      'onLoadMoreTransactions',
      'scanQROnClick',
      'totalBalanceAmount',
    ],
  },
};
