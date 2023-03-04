import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Wealth from '../../components/Wealth';

export default {
  title: 'Components/Wealth',
  component: Wealth,
  argTypes: {
    amount: {
      type: {
        name: 'string', required: true,
      },
    },
    isLoading: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof Wealth>;

const Template: ComponentStory<typeof Wealth> = (args) =>
  <Wealth {...args} />;

export const Closed = Template.bind({});
Closed.args = {
  amount: '25000.12',
  yieldValue: 600,
  yieldValuePercentage: 0.1,
  averageAPY: 13,
};

export const Open = Template.bind({});
Open.args = {
  amount: '25000.12',
  yieldValue: 600,
  yieldValuePercentage: 0.1,
  averageAPY: 13,
};
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const collapseButton = await canvas.getByRole('button', {
    name: 'Collapse Wealth Container',
  });
  await userEvent.click(collapseButton);

  // Clicking away to lose focus
  await userEvent.click(canvasElement);

  const withdrawButton = await canvas.getByRole('link', {
    name: 'Withdraw Button',
  });

  const averageApyText = await canvas.getByText('Average APY 13%');

  await waitFor(() => expect(withdrawButton).toBeVisible());
  await waitFor(() => expect(averageApyText).toBeVisible());

  await waitFor(() =>
    expect(withdrawButton).toHaveAttribute('href', '/withdraw'),
  );
};

export const Inactive = Template.bind({});
Inactive.args = {
  amount: '0',
};
Inactive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const collapseButton = await canvas.getByRole('button', {
    name: 'Disabled Button',
  });

  await waitFor(() => expect(collapseButton).toBeDisabled());

  const withdrawButton = await canvas.getByRole('button', {
    name: 'Withdraw Button',
  });

  await waitFor(() => expect(withdrawButton).toBeDisabled());
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = {
  controls: {
    hideNoControlsWarning: true,
    exclude: [ 'amount', 'averageAPY', 'yieldValue', 'yieldValuePercentage' ],
  },
};
