import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AmountInput from '../../../components/AmountInput';

export default {
  title: 'Components/Inputs/Amount Input',
  component: AmountInput,
  argTypes: {
    onInputChange: {
      action: `'On Input Change' Callback Called`,
    },
  },
} as ComponentMeta<typeof AmountInput>;

const Template: ComponentStory<typeof AmountInput> = (args) =>
  <AmountInput { ...args }/>;

export const Default = Template.bind({});
Default.args = {
  label: 'How much do you want to invest?',
  amount: '10000',
  inputID: 'default-amount-input',
};

export const WithSixDecimals = Template.bind({});
WithSixDecimals.args = {
  label: 'How much do you want to invest?',
  amount: '10000.759213',
  maxDecimals: 6,
  inputID: 'default-amount-input',
};

export const WithoutFixedDecimalScale = Template.bind({});
WithoutFixedDecimalScale.args = {
  label: 'How much do you want to invest?',
  amount: '10000.759213',
  maxDecimals: 6,
  fixedDecimalScale: false,
  inputID: 'default-amount-input',
};

export const Empty = Template.bind({});
Empty.args = {
  label: 'How much do you want to invest?',
  inputID: 'default-amount-input',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'How much do you want to invest?',
  amount: '25000',
  inputID: 'default-amount-input',
  errorMessage: 'Not Enough Money',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'How much do you want to invest?',
  inputID: 'default-amount-input',
  disabled: true,
};
