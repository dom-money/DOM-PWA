import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import YieldDisplay from '../../components/YieldDisplay';

export default {
  title: 'Components/Yield Display',
  component: YieldDisplay,
  argTypes: {
    type: {
      type: { name: 'string', required: false },
      description: 'Type of Yield Display',
      table: {
        defaultValue: {
          summary: 'short',
        },
        type: {
          summary: 'string',
        },
      },
      options: [ 'short', 'long' ],
      control: {
        type: 'select',
      },
    },
    yieldValue: {
      type: { name: 'number', required: true },
      description: 'Yield Value',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    yieldValuePercentage: {
      type: { name: 'number', required: true },
      description: 'Yield Percentage Value',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 0.01,
      },
    },
    averageAPY: {
      type: { name: 'number', required: false },
      description: 'Average Annual Percentage Yield Value',
      table: {
        defaultValue: {
          summary: 0,
        },
        type: {
          summary: 'number',
        },
      },
    },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof YieldDisplay>;

const Template: ComponentStory<typeof YieldDisplay> = (args) =>
  <YieldDisplay {...args} />;

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
