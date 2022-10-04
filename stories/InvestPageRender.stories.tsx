import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InvestPageRender from '../components/InvestPageRender';

export default {
  title: 'Pages/Invest Page',
  component: InvestPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
  argTypes: {
    investButtonOnClick: { action: '\'Invest\' Button Pressed' },
    clearButtonOnClick: { action: '\'Clear\' Button Pressed' },
  },
} as ComponentMeta<typeof InvestPageRender>;

const Template: ComponentStory<typeof InvestPageRender> = (args) =>
  <InvestPageRender {...args} />;

export const Valid = Template.bind({});
Valid.args = {
  availableBalance: 45725.06,
  inputAmount: '10000',
  isInputValid: true,
};

export const Empty = Template.bind({});
Empty.args = {
  availableBalance: 45725.06,
  isInputValid: false,
};

export const WithError = Template.bind({});
WithError.args = {
  availableBalance: 45725.06,
  inputAmount: '46000',
  errorMessage: 'Not Enough Money',
  isInputValid: false,
};

export const Submitting = Template.bind({});
Submitting.args = {
  availableBalance: 45725.06,
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
      'investButtonOnClick',
      'clearButtonOnClick',
      'isLoading',
    ],
  },
};
