import { Meta, StoryObj } from '@storybook/react';

import WithdrawPageRender from '../../components/WithdrawPageRender';

export default {
  title: 'Pages/Withdraw Page',
  component: WithdrawPageRender,
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
    availableBalance: {
      type: {
        name: 'string',
        required: true,
      },
    },
    isInputValid: {
      type: {
        name: 'boolean',
        required: true,
      },
    },
    withdrawButtonOnClick: {
      action: `'Withdraw' Button Pressed`,
    },
    clearButtonOnClick: {
      action: `'Clear' Button Pressed`,
    },
  },
} as Meta<typeof WithdrawPageRender>;

type Story = StoryObj<typeof WithdrawPageRender>;

export const Valid: Story = {
  args: {
    availableBalance: '45725.06',
    inputAmount: '10000',
    isInputValid: true,
  },
};

export const Empty: Story = {
  args: {
    availableBalance: '45725.06',
    isInputValid: false,
  },
};

export const WithError: Story = {
  args: {
    availableBalance: '45725.06',
    inputAmount: '20000.15',
    errorMessage: 'Not Enough Money',
    isInputValid: false,
  },
};

export const Submitting: Story = {
  args: {
    availableBalance: '45725.06',
    inputAmount: '10000',
    isInputValid: true,
    isSubmitting: true,
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
        'availableBalance',
        'errorMessage',
        'inputAmount',
        'isInputValid',
        'isSubmitting',
        'onInputChange',
        'withdrawButtonOnClick',
        'clearButtonOnClick',
      ],
    },
  },
};
