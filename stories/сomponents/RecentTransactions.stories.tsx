import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import RecentTransactions from '../../components/RecentTransactions';
import {
  CryptoTopUp,
  CardTopUp,
  Invest,
  Withdraw,
  Transfer,
} from './Transaction.stories';
import { TransactionProps } from '../../components/Transaction';

export default {
  title: 'Components/Recent Transactions',
  component: RecentTransactions,
  argTypes: {
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
    onLoadMore: {
      action: `'Load More' Action`,
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof RecentTransactions>;

const Template: ComponentStory<typeof RecentTransactions> = (args) =>
  <RecentTransactions {...args} />;

export const Closed = Template.bind({});
Closed.args = {
  transactions: [
    { ...CryptoTopUp.args },
    { ...CardTopUp.args },
    { ...Invest.args },
    { ...Withdraw.args },
    { ...Transfer.args },
  ],
} as { transactions: TransactionProps[] };

export const Open = Template.bind({});
Open.args = {
  transactions: [
    { ...CryptoTopUp.args },
    { ...CardTopUp.args },
    { ...Invest.args },
    { ...Withdraw.args },
    { ...Transfer.args },
  ],
} as { transactions: TransactionProps[] };
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const clickableHeader =
    await canvas.getByTestId('RecentTransactionsOpenCloseIcon');
  await userEvent.click(clickableHeader);
};

export const Empty = Template.bind({});
Empty.args = {
  transactions: [],
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = {
  controls: {
    hideNoControlsWarning: true,
    exclude: [ 'transactions', 'isLoading' ],
  },
};

export const LoadingMore = Template.bind({});
LoadingMore.args = {
  transactions: [
    { ...CryptoTopUp.args },
    { ...CardTopUp.args },
    { ...Invest.args },
    { ...Withdraw.args },
    { ...Transfer.args },
  ],
  isLoadingMore: true,
} as { transactions: TransactionProps[] };
LoadingMore.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const clickableHeader =
    await canvas.getByTestId('RecentTransactionsOpenCloseIcon');
  await userEvent.click(clickableHeader);
};
