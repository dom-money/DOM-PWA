import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AmountInput from '../../../components/AmountInput';

export default {
  title: 'Components/Inputs/Amount Input',
  component: AmountInput,
  argTypes: {
    label: {
      type: { name: 'string', required: true },
      description: 'Label text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    amount: {
      type: { name: 'string', required: false },
      description: 'Amount as a string (when using state)',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    maxDecimals: {
      type: { name: 'number', required: false },
      description: 'Number of max allowed decimals',
      table: {
        defaultValue: {
          summary: '2',
        },
        type: {
          summary: 'number',
        },
      },
    },
    fixedDecimalScale: {
      type: { name: 'boolean', required: false },
      description: 'Should fixed number of decimals be always displayed?',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    inputID: {
      type: { name: 'string', required: true },
      description: 'HTML `<input>` id Attribute',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    onInputChange: {
      type: { name: 'function', required: false },
      description: 'Input on change handler function (when using state)',
      table: {
        type: {
          summary: '({ formattedValue, value }) => void',
          detail: 'formattedValue: string, value: string',
        },
      },
    },
    errorMessage: {
      type: { name: 'string', required: false },
      description: 'Optional validation error message',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    autoFocus: {
      type: { name: 'boolean', required: false },
      description: 'Optional autofocus prop',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      type: { name: 'boolean', required: false },
      description: 'Is input disabled?',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
} as ComponentMeta<typeof AmountInput>;

const Template: ComponentStory<typeof AmountInput> = (args) =>
  <AmountInput {...args}/>;

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
