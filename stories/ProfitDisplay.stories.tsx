import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfitDisplay from '../components/ProfitDisplay';

export default {
  title: 'Components/Profit Display',
  component: ProfitDisplay,
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof ProfitDisplay>;

const Template: ComponentStory<typeof ProfitDisplay> = (args) =>
  <ProfitDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  profit: 0,
  profitPercentage: 0,
  averageAPY: 0,
};
