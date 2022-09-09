import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WithdrawPageRender from '../../components/WithdrawPageRender';

export default {
  title: 'Pages/Withdraw Page',
  component: WithdrawPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
  argTypes: {
    withdrawButtonOnClick: { action: '\'Withdraw\' Button Pressed' },
    clearButtonOnClick: { action: '\'Clear\' Button Pressed' },
  },
} as ComponentMeta<typeof WithdrawPageRender>;

const Template: ComponentStory<typeof WithdrawPageRender> = (args) =>
  <WithdrawPageRender {...args} />;

export const Valid = Template.bind({});
Valid.args = {
  availableBalance: '45725.06',
  inputAmount: '10000',
  isInputValid: true,
};

export const Empty = Template.bind({});
Empty.args = {
  availableBalance: '45725.06',
  isInputValid: false,
};

export const WithError = Template.bind({});
WithError.args = {
  availableBalance: '45725.06',
  inputAmount: '20000.15',
  errorMessage: 'Not Enough Money',
  isInputValid: false,
};

export const Submitting = Template.bind({});
Submitting.args = {
  availableBalance: '45725.06',
  inputAmount: '10000',
  isInputValid: true,
  isSubmitting: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = {
  controls: {
    hideNoControlsWarning: true,
    exclude: [
      'withdrawButtonOnClick',
      'clearButtonOnClick',
      'isLoading',
    ],
  },
};
