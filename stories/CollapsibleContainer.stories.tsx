import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import CollapsibleContainer from '../components/CollapsibleContainer';

const SampleContent = () => {
  return (
    <h3 style={{ color: 'white' }}>Sample Content</h3>
  );
};

export default {
  title: 'Components/CollapsibleContainer',
  component: CollapsibleContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CollapsibleContainer>;

const Template: ComponentStory<typeof CollapsibleContainer> = (args) =>
  <CollapsibleContainer {...args} />;

export const Open = Template.bind({});
Open.args = {
  label: 'Wallet',
  children: <SampleContent />,
};

export const Closed = Template.bind({});
Closed.args = {
  label: 'Wallet',
  children: <SampleContent />,
};

Closed.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const clickableHeader = await canvas.getByTestId('openCloseIcon');
  await userEvent.click(clickableHeader);
};
