import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import Wealth from '../../components/Wealth';

export default {
  title: 'Components/Wealth',
  component: Wealth,
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
  const clickableHeader = await canvas.getByTestId('WealthOpenCloseIcon');
  await userEvent.click(clickableHeader);
};

export const Inactive = Template.bind({});
Inactive.args = {
  amount: '0',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.parameters = {
  controls: {
    hideNoControlsWarning: true,
    exclude: [ 'isLoading' ],
  },
};
