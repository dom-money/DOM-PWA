import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import RecentTransactions from '../components/RecentTransactions';
import {
  CryptoTopUp,
  CardTopUp,
  Invest,
  Withdraw,
  Transfer,
} from './Transaction.stories';
import { TransactionProps } from '../components/Transaction';

export default {
  title: 'Components/Recent Transactions',
  component: RecentTransactions,
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
