import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AmountDisplay from '../../components/AmountDisplay';

export default {
  title: 'Components/Amount Display',
  component: AmountDisplay,
  argTypes: {
    amount: {
      type: { name: 'string', required: true },
      description: 'Currency amount',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    size: {
      type: { name: 'string', required: false },
      description: 'Amount Display Size (small: 40px, medium: 48px)',
      table: {
        defaultValue: {
          summary: 'small',
        },
        type: {
          summary: 'string',
        },
      },
      options: [ 'small', 'medium' ],
      control: { type: 'select' },
    },
    inactive: {
      type: { name: 'boolean', required: false },
      description: 'Is component inactive?',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
      control: { type: 'boolean' },
    },
    useGrouping: {
      type: { name: 'boolean', required: false },
      description: 'Should grouping separator be displayed?',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'boolean',
        },
      },
      control: { type: 'boolean' },
    },
    maxDecimals: {
      type: { name: 'number', required: false },
      description: 'Max number of decimals for display',
      table: {
        defaultValue: {
          summary: '2',
        },
        type: {
          summary: 'number',
        },
      },
    },
    shouldAddTrailingZeros: {
      type: { name: 'boolean', required: false },
      description: `Should trailing zeros be added to
      always match the desired number of decimals?`,
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
  },
} as ComponentMeta<typeof AmountDisplay>;

const Template: ComponentStory<typeof AmountDisplay> = (args) =>
  <AmountDisplay {...args} />;

export const PositiveAmountMedium = Template.bind({});
PositiveAmountMedium.args = {
  amount: '45725.06',
  size: 'medium',
};

export const PositiveAmountSmall = Template.bind({});
PositiveAmountSmall.args = {
  amount: '20000.12',
  size: 'small',
};
PositiveAmountSmall.parameters = {
  backgrounds: { default: 'darkAdditional' },
};

export const ZeroAmount = Template.bind({});
ZeroAmount.args = {
  amount: '0',
  size: 'medium',
};

export const Inactive = Template.bind({});
Inactive.args = {
  amount: '0',
  size: 'small',
  inactive: true,
};
Inactive.parameters = {
  backgrounds: { default: 'darkAdditional' },
};

export const WithoutGrouping = Template.bind({});
WithoutGrouping.args = {
  amount: '45725.06',
  size: 'medium',
  useGrouping: false,
};

export const WithoutTrailingZeros = Template.bind({});
WithoutTrailingZeros.args = {
  amount: '45725.10',
  size: 'medium',
  maxDecimals: 2,
  shouldAddTrailingZeros: false,
};

export const WithSixDecimals = Template.bind({});
WithSixDecimals.args = {
  amount: '45725.06',
  size: 'medium',
  maxDecimals: 6,
  shouldAddTrailingZeros: true,
};

const loadingParameters = {
  controls: {
    exclude: [
      'amount',
      'inactive',
      'isLoading',
      'useGrouping',
      'maxDecimals',
      'shouldAddTrailingZeros',
    ],
  },
};

export const LoadingMedium = Template.bind({});
LoadingMedium.args = {
  isLoading: true,
  size: 'medium',
};
LoadingMedium.parameters = loadingParameters;

export const LoadingSmall = Template.bind({});
LoadingSmall.args = {
  isLoading: true,
  size: 'small',
};
LoadingSmall.parameters = loadingParameters;
