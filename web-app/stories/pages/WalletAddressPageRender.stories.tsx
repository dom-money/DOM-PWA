import { Meta, StoryObj } from '@storybook/react';

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
        name: 'string',
        required: true,
      },
    },
    shareButtonOnClick: {
      action: `'Share' Button Clicked`,
    },
    copyAddressButtonOnClick: {
      action: `'Copy Address' Button Clicked`,
    },
  },
} as Meta<typeof WalletAddressPageRender>;

type Story = StoryObj<typeof WalletAddressPageRender>;

export const Default: Story = {
  args: {
    address: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },

  parameters: {
    controls: {
      hideNoControlsWarning: true,
      exclude: [
        'address',
        'shareButtonOnClick',
        'copyAddressButtonOnClick',
        'isLoading',
      ],
    },
  },
};
