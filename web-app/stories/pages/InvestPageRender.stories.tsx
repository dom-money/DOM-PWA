import { Meta, StoryObj } from '@storybook/react';

import InvestPageRender from '../../components/InvestPageRender';

export default {
  title: 'Pages/Invest Page',
  component: InvestPageRender,
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
    investButtonOnClick: {
      action: `'Invest' Button Pressed`,
    },
    clearButtonOnClick: {
      action: `'Clear' Button Pressed`,
    },
  },
} as Meta<typeof InvestPageRender>;

type Story = StoryObj<typeof InvestPageRender>;

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
    inputAmount: '46000',
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
        'investButtonOnClick',
        'clearButtonOnClick',
      ],
    },
  },
};
