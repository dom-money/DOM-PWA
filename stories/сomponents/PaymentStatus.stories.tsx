import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { screen, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import PaymentStatus from '../../components/PaymentStatus';

import SendToWalletPageRender from '../../components/SendToWalletPageRender';

export default {
  title: 'Components/Payment Status',
  component: PaymentStatus,
  argTypes: {
    type: {
      control: false,
    },
    onClose: {
      action: `'Payment Status' Drawer Closed`,
    },
    onExited: {
      action: `'Payment Status' Component Unmounted`,
    },
    message: {
      type: { name: 'string', required: true },
      if: { arg: 'type', eq: 'successful' },
    },
    sendAgainOnClick: {
      if: { arg: 'type', eq: 'successful' },
      action: `'Send Again' Button Clicked`,
    },
    errorMessage: {
      type: { name: 'string', required: true },
      if: { arg: 'type', eq: 'failed' },
    },
    tryAgainOnClick: {
      if: { arg: 'type', eq: 'failed' },
      action: `'Try Again' Button Clicked`,
    },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
} as ComponentMeta<typeof PaymentStatus>;

const Template: ComponentStory<typeof PaymentStatus> = (args) => {
  const [ { isOpen, onClose }, updateArgs ] = useArgs();

  const handleDrawerClose = () => {
    updateArgs({ isOpen: false });
    onClose();
  };

  return (
    <>
      <SendToWalletPageRender
        availableBalance='45725.06'
        inputAmount='10000'
        inputAddress='0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca'
        areInputsValid={ true }
      />
      <PaymentStatus
        { ...args }
        isOpen={ isOpen }
        onClose={ handleDrawerClose }
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
Successful.play = async ({ args, canvasElement }) => {
  const sendAgainButton = screen.getByRole('button', { name: 'Send Again' });
  const nextButton = screen.getByRole('link', { name: 'Next' });
  await waitFor(() => userEvent.click(sendAgainButton));

  await waitFor(() => expect(args.sendAgainOnClick).toHaveBeenCalled());
  await expect(nextButton).toHaveAttribute('href', '/');

  // Clicking away to lose focus
  await waitFor(() => userEvent.click(canvasElement));
};

export const Failed = Template.bind({});
Failed.args = {
  type: 'failed',
  isOpen: true,
  paymentTo: '0x64ff637fb478863b7468bc97d30a5bf3a415fAb3',
  amount: '200',
  errorMessage: 'Insufficient funds',
};
Failed.play = async ({ args, canvasElement }) => {
  const tryAgainButton = screen.getByRole('button', { name: 'Try Again' });
  const homeButton = screen.getByRole('link', { name: 'Home' });
  await waitFor(() => userEvent.click(tryAgainButton));

  await waitFor(() => expect(args.tryAgainOnClick).toHaveBeenCalled());
  await expect(homeButton).toHaveAttribute('href', '/');

  // Clicking away to lose focus
  await waitFor(() => userEvent.click(canvasElement));
};
