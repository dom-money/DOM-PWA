import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import PaymentStatus from '../components/PaymentStatus';

import SendToWalletPageRender from '../components/SendToWalletPageRender';

export default {
  title: 'Components/Payment Status',
  component: PaymentStatus,
  argTypes: {
    type: {
      type: { name: 'string', required: true },
      description: 'Type of Payment Status',
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [ 'successful', 'failed' ],
      control: {
        type: 'select',
      },
    },
    sendAgainOnClick: { action: '\'Send Again\' Button Pressed' },
    tryAgainOnClick: { action: '\'Try Again\' Button Pressed' },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
} as ComponentMeta<typeof PaymentStatus>;

const Template: ComponentStory<typeof PaymentStatus> = (args) => {
  const [ { isOpen }, updateArgs ] = useArgs();

  const handleDrawerClose = () => {
    updateArgs({ isOpen: false });
  };

  return (
    <>
      <SendToWalletPageRender
        availableBalance={45725.06}
        inputAmount='10000'
        inputAddress='0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca'
        areInputsValid={true}
      />
      <PaymentStatus
        {...args}
        isOpen={isOpen}
        onClose={handleDrawerClose}
      />
    </>
  );
};

export const Successful = Template.bind({});
Successful.args = {
  type: 'successful',
  isOpen: true,
  paymentTo: '0x64ff637fb478863b7468bc97d30a5bf3a415fAb3',
  amount: '200',
  message: 'Submitted successfully',
};

export const Failed = Template.bind({});
Failed.args = {
  type: 'failed',
  isOpen: true,
  paymentTo: '0x64ff637fb478863b7468bc97d30a5bf3a415fAb3',
  amount: '200',
  errorMessage: 'Insufficient funds',
};
