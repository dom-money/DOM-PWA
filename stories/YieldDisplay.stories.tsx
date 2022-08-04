import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import YieldDisplay from '../components/YieldDisplay';

export default {
  title: 'Components/Yield Display',
  component: YieldDisplay,
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof YieldDisplay>;

const Template: ComponentStory<typeof YieldDisplay> = (args) =>
  <YieldDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  yieldValue: 0,
  yieldValuePercentage: 0,
  averageAPY: 0,
};
