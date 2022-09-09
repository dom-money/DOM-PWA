import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import SendToWalletPageRender from '../../components/SendToWalletPageRender';

export default {
  title: 'Pages/Send To Wallet',
  component: SendToWalletPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
  argTypes: {
    sendButtonOnClick: { action: '\'Send\' Button Pressed' },
    clearButtonOnClick: { action: '\'Clear\' Button Pressed' },
    getContactOnClick: { action: '\'Get Contact\' Button Clicked' },
    scanQROnClick: { action: '\'Scan QR\' Button Clicked' },
  },
} as ComponentMeta<typeof SendToWalletPageRender>;

const Template: ComponentStory<typeof SendToWalletPageRender> = (args) => {
  const [ { inputAddress }, updateArgs ] = useArgs();

  const handleValueChange = (inputAddress: string) => {
    updateArgs({ inputAddress: inputAddress });
  };

  const handleFocus = (prefill?: string) => {
    updateArgs({ inputAddress: prefill });
  };

  return <SendToWalletPageRender
    availableBalance='45725.06'
    areInputsValid={false}
    {...args}
    isLoading={false}
    inputAddress={inputAddress}
    onInputAddressChange={handleValueChange}
    onInputAddressFocus={handleFocus}
  />;
};

const LoadingTemplate: ComponentStory<typeof SendToWalletPageRender> = (args) =>
  <SendToWalletPageRender {...args} />;

export const Valid = Template.bind({});
Valid.args = {
  availableBalance: '45725.06',
  inputAmount: '10000',
  inputAddress: '0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca',
  areInputsValid: true,
};

export const Empty = Template.bind({});
Empty.args = {
  availableBalance: '45725.06',
  inputAmount: '',
  inputAddress: '',
  areInputsValid: false,
};

export const WithError = Template.bind({});
WithError.args = {
  availableBalance: '45725.06',
  inputAmount: '46000',
  inputAddress: '0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca',
  inputAmountErrorMessage: 'Not Enough Money',
  areInputsValid: false,
};

export const Submitting = Template.bind({});
Submitting.args = {
  availableBalance: '45725.06',
  inputAmount: '10000',
  inputAddress: '0xeA2a9ca3d52BEF67Cf562B59c5709B32Ed4c0eca',
  areInputsValid: true,
  isSubmitting: true,
};

export const Loading = LoadingTemplate.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = {
  controls: {
    hideNoControlsWarning: true,
    exclude: [
      'sendButtonOnClick',
      'clearButtonOnClick',
      'getContactOnClick',
      'scanQROnClick',
      'isLoading',
    ],
  },
};
