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
  title: 'Components/Collapsible Container',
  component: CollapsibleContainer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    shouldSecondaryContentBeOutside: { control: 'boolean' },
  },
} as ComponentMeta<typeof CollapsibleContainer>;

const Template: ComponentStory<typeof CollapsibleContainer> = (args) =>
  <CollapsibleContainer {...args} />;

export const Closed = Template.bind({});
Closed.args = {
  label: 'Wallet',
  primaryContent: <SampleContent />,
  secondaryContent: <SampleContent />,
};

export const Open = Template.bind({});
Open.args = {
  label: 'Wallet',
  primaryContent: <SampleContent />,
  secondaryContent: <SampleContent />,
};

Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const clickableHeader = await canvas.getByTestId('openCloseIcon');
  await userEvent.click(clickableHeader);
};

export const ContentOutside = Template.bind({});
ContentOutside.args = {
  label: 'Wallet',
  shouldSecondaryContentBeOutside: true,
  primaryContent: <SampleContent />,
  secondaryContent: <SampleContent />,
};
