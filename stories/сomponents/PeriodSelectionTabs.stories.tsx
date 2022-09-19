import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PeriodSelectionTabs from '../../components/PeriodSelectionTabs';

export default {
  title: 'Components/Period Selection Tabs',
  component: PeriodSelectionTabs,
  argTypes: {
    selectedButtonID: {
      options: [ 0, 1, 2, 3, 4 ],
      control: { type: 'radio' },
    },
    onClick: { action: `Tab Button Clicked` },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof PeriodSelectionTabs>;

const Template: ComponentStory<typeof PeriodSelectionTabs> = (args) =>
  <PeriodSelectionTabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  selectedButtonID: 0,
};
