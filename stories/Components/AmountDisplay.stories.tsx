import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AmountDisplay from '../../components/AmountDisplay';

export default {
  title: 'Components/Amount Display',
  component: AmountDisplay,
  argTypes: {
    size: {
      options: [ 'small', 'medium' ],
      control: { type: 'select' },
    },
    inactive: { control: 'boolean' },
  },
} as ComponentMeta<typeof AmountDisplay>;

const Template: ComponentStory<typeof AmountDisplay> = (args) =>
  <AmountDisplay {...args} />;

export const PositiveAmountMedium = Template.bind({});
PositiveAmountMedium.args = {
  amount: 45725.06,
  size: 'medium',
};

export const PositiveAmountSmall = Template.bind({});
PositiveAmountSmall.args = {
  amount: 20000.12,
  size: 'small',
};
PositiveAmountSmall.parameters = {
  backgrounds: { default: 'darkAdditional' },
};

export const ZeroAmount = Template.bind({});
ZeroAmount.args = {
  amount: 0,
  size: 'medium',
};

export const Inactive = Template.bind({});
Inactive.args = {
  amount: 0,
  size: 'small',
  inactive: true,
};
Inactive.parameters = {
  backgrounds: { default: 'darkAdditional' },
};

const loadingParameters = {
  controls: {
    exclude: [ 'amount', 'inactive', 'isLoading' ],
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
