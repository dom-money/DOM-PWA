import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import PeriodSelectionTabs, {
  Period,
} from '../../components/PeriodSelectionTabs';

export default {
  title: 'Components/Period Selection Tabs',
  component: PeriodSelectionTabs,
  argTypes: {
    onClick: {
      action: 'Period Selected',
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof PeriodSelectionTabs>;

const Template: ComponentStory<typeof PeriodSelectionTabs> = (args) => {
  const [ { selectedPeriod, onClick }, updateArgs ] = useArgs();

  const handleClick = (period: Period) => {
    updateArgs({ selectedPeriod: period });
    onClick(period);
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
