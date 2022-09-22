import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import Wallet from '../../components/Wallet';

export default {
  title: 'Components/Wallet',
  component: Wallet,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    scanQROnClick: {
      action: `'Scan QR' Icon Button Clicked`,
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Wallet>;

const Template: ComponentStory<typeof Wallet> = (args) =>
  <Wallet {...args} />;

export const Closed = Template.bind({});
Closed.args = {
  amount: '20000.12',
};

export const Open = Template.bind({});
Open.args = {
  amount: '20000.12',
};
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const clickableHeader = await canvas.getByTestId('WalletOpenCloseIcon');
  await userEvent.click(clickableHeader);
};

export const Inactive = Template.bind({});
Inactive.args = {
  amount: '0',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = {
  controls: {
    hideNoControlsWarning: true,
    exclude: [ 'scanQROnClick', 'isLoading' ],
  },
};
