import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Transaction from '../components/Transaction';

export default {
  title: 'Components/Transaction',
  component: Transaction,
  decorators: [
    (story) => (
      <div style={{
        display: 'flex',
        alignSelf: 'center',
        height: '100vh',
        width: 'min(100% - 2rem, 600px)',
        marginInline: 'auto',
      }}>
        {story()}
      </div>
    ),
  ],
  argTypes: {
    type: {
      type: { name: 'string', required: true },
      description: 'Type of Transaction',
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [
        'Crypto Top Up',
        'Card Top Up',
        'Invest',
        'Withdraw',
        'Transfer',
      ],
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      inlineStories: false,
      iframeHeight: 250,
    },
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof Transaction>;

const Template: ComponentStory<typeof Transaction> = (args) =>
  <Transaction {...args} />;

export const CryptoTopUp = Template.bind({});
CryptoTopUp.args = {
  id: 1,
  name: 'Deposit from 0xEe5b9E3a125F5c6c74cE8AEbFa76b72B3D6CF009',
  type: 'Crypto Top Up',
  timestamp: Math.floor(new Date().getTime() / 1000),
  amount: 1000.00,
};

export const CardTopUp = Template.bind({});
CardTopUp.args = {
  id: 2,
  name: 'Revolut LTD Visa *8035',
  type: 'Card Top Up',
  timestamp: Math.floor((new Date().getTime() / 1000) - 86400),
  amount: 560.00,
};

export const Invest = Template.bind({});
Invest.args = {
  id: 3,
  name: 'Wallet to Wealth',
  type: 'Invest',
  timestamp: Math.floor((new Date().getTime() / 1000) - (5 * 86400)),
  amount: 750.37,
};

export const Withdraw = Template.bind({});
Withdraw.args = {
  id: 4,
  name: 'Wealth to Wallet',
  type: 'Withdraw',
  timestamp: Math.floor((new Date().getTime() / 1000) - (14 * 86400)),
  amount: 764.13,
};

export const Transfer = Template.bind({});
Transfer.args = {
  id: 5,
  name: 'Transfer to 0xEe5b9E3a125F5c6c74cE8AEbFa76b72B3D6CF009',
  type: 'Transfer',
  timestamp: Math.floor((new Date().getTime() / 1000) - (365 * 86400)),
  amount: 250.17,
};
