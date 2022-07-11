import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AmountDisplay from '../components/AmountDisplay';

export default {
  title: 'Components/Amount Display',
  component: AmountDisplay,
  decorators: [
    (Story) => (
      <div style={{
        display: 'inline-block',
        padding: '2rem',
        backgroundColor: '#020202',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
      }}>
        <Story />
      </div>
    ),
  ],
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
