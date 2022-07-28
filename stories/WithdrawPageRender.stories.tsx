import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WithdrawPageRender from '../components/WithdrawPageRender';

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
  totalAmount: 45725.06,
  inputAmount: '10000',
  isValid: true,
};

export const Empty = Template.bind({});
Empty.args = {
  totalAmount: 45725.06,
  isValid: false,
};

export const WithError = Template.bind({});
WithError.args = {
  totalAmount: 45725.06,
  inputAmount: '20000.15',
  isError: true,
  errorMessage: 'Not Enough Money',
  isValid: false,
};
