import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletAddressPageRender from '../components/WalletAddressPageRender';

export default {
  title: 'Pages/Wallet Address Page',
  component: WalletAddressPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
  argTypes: {
    shareButtonOnClick: { action: '\'Share\' Button Pressed' },
    copyAddressButtonOnClick: { action: '\'Copy Address\' Button Pressed' },
  },
} as ComponentMeta<typeof WalletAddressPageRender>;

const Template: ComponentStory<typeof WalletAddressPageRender> = (args) =>
  <WalletAddressPageRender {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalAmount: 0,
  address: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
};
