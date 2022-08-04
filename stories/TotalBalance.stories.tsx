import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TotalBalance from '../components/TotalBalance';

export default {
  title: 'Components/Total Balance',
  component: TotalBalance,
} as ComponentMeta<typeof TotalBalance>;

const Template: ComponentStory<typeof TotalBalance> = (args) =>
  <TotalBalance {...args} />;

export const PositiveAmount = Template.bind({});
PositiveAmount.args = {
  amount: 45725.06,
};

export const ZeroAmount = Template.bind({});
ZeroAmount.args = {
  amount: 0,
};

