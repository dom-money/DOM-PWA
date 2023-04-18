import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
      type: {
        name: 'other', value: 'TransactionProps[] | []', required: true,
      },
    },
    onLoadMore: {
      action: `'Load More' Action`,
    },
    isLoading: {
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
  <RecentTransactions { ...args } />;

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
  const collapseButton = await canvas.getByRole('button');
  await userEvent.click(collapseButton);

  const lastTransactionTitleElement =
    canvas.getByText('Transfer to 0xEe5b9E3a125F5c6c74cE8AEbFa76b72B3D6CF009');
  await waitFor(() => expect(lastTransactionTitleElement).toBeVisible());
};

export const Empty = Template.bind({});
Empty.args = {
  transactions: [],
};
Empty.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const collapseButton = await canvas.getByRole('button');

  await waitFor(() => expect(collapseButton).toBeDisabled());
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = {
  controls: {
    exclude: [ 'transactions', 'isLoadingMore', 'onLoadMore' ],
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
LoadingMore.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const collapseButton = await canvas.getByRole('button');
  await userEvent.click(collapseButton);

  const lastTransactionTitleElement =
    canvas.getByText('Transfer to 0xEe5b9E3a125F5c6c74cE8AEbFa76b72B3D6CF009');
  await userEvent.hover(lastTransactionTitleElement);

  await waitFor(() => expect(args.onLoadMore).toBeCalledTimes(1));
};
