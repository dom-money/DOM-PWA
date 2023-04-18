import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import YieldDisplay from '../../components/YieldDisplay';

export default {
  title: 'Components/Yield Display',
  component: YieldDisplay,
  argTypes: {
    averageAPY: {
      if: { arg: 'type', eq: 'long' },
    },
    className: {
      table: { disable: true },
    },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof YieldDisplay>;

const Template: ComponentStory<typeof YieldDisplay> = (args) =>
  <YieldDisplay { ...args } />;

export const Short = Template.bind({});
Short.args = {
  type: 'short',
  yieldValue: 275,
  yieldValuePercentage: 1.1,
};

export const Long = Template.bind({});
Long.args = {
  type: 'long',
  yieldValue: 600,
  yieldValuePercentage: 0.1,
  averageAPY: 13,
};
