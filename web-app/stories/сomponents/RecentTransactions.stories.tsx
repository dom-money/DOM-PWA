import { Meta, StoryObj } from '@storybook/react';
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
        name: 'other',
        value: 'TransactionProps[] | []',
        required: true,
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
} as Meta<typeof RecentTransactions>;

type Story = StoryObj<typeof RecentTransactions>;

export const Closed: Story = {
  args: {
    transactions: [
      { ...CryptoTopUp.args },
      { ...CardTopUp.args },
      { ...Invest.args },
      { ...Withdraw.args },
      { ...Transfer.args },
    ],
  } as { transactions: TransactionProps[] },
};

export const Open: Story = {
  args: {
    transactions: [
      { ...CryptoTopUp.args },
      { ...CardTopUp.args },
      { ...Invest.args },
      { ...Withdraw.args },
      { ...Transfer.args },
    ],
  } as { transactions: TransactionProps[] },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const collapseButton = await canvas.getByRole('button');
    await userEvent.click(collapseButton);

    const lastTransactionTitleElement = canvas.getByText(
        'Transfer to 0xEe5b9E3a125F5c6c74cE8AEbFa76b72B3D6CF009',
    );
    await waitFor(() => expect(lastTransactionTitleElement).toBeVisible());
  },
};

export const Empty: Story = {
  args: {
    transactions: [],
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const collapseButton = await canvas.getByRole('button');

    await waitFor(() => expect(collapseButton).toBeDisabled());
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },

  parameters: {
    controls: {
      exclude: [ 'transactions', 'isLoadingMore', 'onLoadMore' ],
    },
  },
};

export const LoadingMore: Story = {
  args: {
    transactions: [
      { ...CryptoTopUp.args },
      { ...CardTopUp.args },
      { ...Invest.args },
      { ...Withdraw.args },
      { ...Transfer.args },
    ],
    isLoadingMore: true,
  } as { transactions: TransactionProps[] },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const collapseButton = await canvas.getByRole('button');
    await userEvent.click(collapseButton);

    const lastTransactionTitleElement = canvas.getByText(
        'Transfer to 0xEe5b9E3a125F5c6c74cE8AEbFa76b72B3D6CF009',
    );
    await userEvent.hover(lastTransactionTitleElement);

    await waitFor(() => expect(args.onLoadMore).toBeCalledTimes(1));
  },
};
