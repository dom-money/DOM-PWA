import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import PeriodSelectionTabs, {
  Period,
  PERIODS,
} from '../../components/PeriodSelectionTabs';

export default {
  title: 'Components/Period Selection Tabs',
  component: PeriodSelectionTabs,
  argTypes: {
    selectedPeriod: {
      options: PERIODS,
      control: { type: 'radio' },
    },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof PeriodSelectionTabs>;

const Template: ComponentStory<typeof PeriodSelectionTabs> = (args) => {
  const [ { selectedPeriod }, updateArgs ] = useArgs();

  const handleClick = (period: Period) => {
    updateArgs({ selectedPeriod: period });
  };

  return <PeriodSelectionTabs
    {...args}
    selectedPeriod={selectedPeriod}
    onClick={handleClick}
  />;
};

export const Default = Template.bind({});
Default.args = {
  selectedPeriod: 'Today',
};
