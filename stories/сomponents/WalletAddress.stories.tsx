import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletAddress from '../../components/WalletAddress';

export default {
  title: 'Components/Wallet Address',
  component: WalletAddress,
  argTypes: {
    isLoading: {
      table: {
        disable: true,
      },
    },
    address: {
      type: {
        name: 'string', required: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof WalletAddress>;

const Template: ComponentStory<typeof WalletAddress> = (args) =>
  <WalletAddress { ...args } />;

export const Default = Template.bind({});
Default.args = {
  address: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = {
  controls: {
    hideNoControlsWarning: true,
    exclude: [ 'address' ],
  },
};
