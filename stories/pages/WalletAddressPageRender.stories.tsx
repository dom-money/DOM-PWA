import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletAddressPageRender from '../../components/WalletAddressPageRender';

export default {
  title: 'Pages/Wallet Address Page',
  component: WalletAddressPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
    controls: {
      exclude: [ 'isLoading' ],
    },
  },
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
    shareButtonOnClick: {
      action: `'Share' Button Clicked`,
    },
    copyAddressButtonOnClick: {
      action: `'Copy Address' Button Clicked`,
    },
  },
} as ComponentMeta<typeof WalletAddressPageRender>;

const Template: ComponentStory<typeof WalletAddressPageRender> = (args) =>
  <WalletAddressPageRender { ...args } />;

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
    exclude: [
      'address',
      'shareButtonOnClick',
      'copyAddressButtonOnClick',
      'isLoading',
    ],
  },
};
