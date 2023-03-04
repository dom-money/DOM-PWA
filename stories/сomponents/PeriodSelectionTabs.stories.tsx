import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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

export const WithInteractions = Template.bind({});
WithInteractions.args = {
  selectedPeriod: 'Today',
};
WithInteractions.play = async ({ args, canvasElement }) => {
  const sleep = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const canvas = within(canvasElement);
  const todayButton = canvas.getByRole('button', { name: 'Today' });
  const weekButton = canvas.getByRole('button', { name: 'Week' });
  const monthButton = canvas.getByRole('button', { name: 'Month' });
  const yearButton = canvas.getByRole('button', { name: 'Year' });
  const allTimeButton = canvas.getByRole('button', { name: 'All Time' });

  await sleep(1000);

  await waitFor(() => userEvent.click(weekButton));
  await waitFor(() => expect(args.onClick).toHaveBeenCalledWith('Week'));

  await sleep(1000);

  await waitFor(() => userEvent.click(monthButton));
  await waitFor(() => expect(args.onClick).toHaveBeenCalledWith('Month'));

  await sleep(1000);

  await waitFor(() => userEvent.click(yearButton));
  await waitFor(() => expect(args.onClick).toHaveBeenCalledWith('Year'));

  await sleep(1000);

  await waitFor(() => userEvent.click(allTimeButton));
  await waitFor(() => expect(args.onClick).toHaveBeenCalledWith('All Time'));

  await sleep(1000);

  await waitFor(() => userEvent.click(todayButton));
  await waitFor(() => expect(args.onClick).toHaveBeenCalledWith('Today'));

  // Clicking away to lose focus
  await waitFor(() => userEvent.click(canvasElement));
};
