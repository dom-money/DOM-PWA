import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Wealth from '../components/Wealth';

export default {
  title: 'Components/Wealth',
  component: Wealth,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof Wealth>;

const Template: ComponentStory<typeof Wealth> = (args) =>
  <Wealth {...args} />;

export const Default = Template.bind({});
Default.args = {
  amount: 25000.12,
  profit: 600,
  profitPercentage: 0.1,
  averageAPY: 13,
};

export const Inactive = Template.bind({});
Inactive.args = {
  amount: 0,
};
