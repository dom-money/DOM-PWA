import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TotalBalance from '../components/TotalBalance';

export default {
  title: 'Components/Total Balance',
  component: TotalBalance,
  argTypes: {
    amount: {
      type: { name: 'number', required: true },
      description: 'Amount to display',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    asAvailableBalance: {
      type: { name: 'boolean' },
      description: 'Should title be \'Available Balance\'?',
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
} as ComponentMeta<typeof TotalBalance>;

const Template: ComponentStory<typeof TotalBalance> = (args) =>
  <TotalBalance {...args} />;

export const PositiveAmount = Template.bind({});
PositiveAmount.args = {
  amount: 45725.06,
};

export const ZeroAmount = Template.bind({});
ZeroAmount.args = {
  amount: 0,
};

export const AsAvailableBalance = Template.bind({});
AsAvailableBalance.args = {
  amount: 45725.06,
  asAvailableBalance: true,
};

const loadingParameters = {
  controls: {
    exclude: [ 'amount', 'isLoading' ],
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = loadingParameters;

export const LoadingAsAvailableBalance = Template.bind({});
LoadingAsAvailableBalance.args = {
  isLoading: true,
  asAvailableBalance: true,
};
LoadingAsAvailableBalance.parameters = loadingParameters;
