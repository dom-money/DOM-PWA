import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { useArgs } from '@storybook/client-api';

import CollapsibleContainer from '../components/CollapsibleContainer';

const SampleContent = () => {
  return (
    <h3 style={{ color: 'white', fontWeight: 500 }}>Sample Content</h3>
  );
};

export default {
  title: 'Components/Collapsible Container',
  component: CollapsibleContainer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isCollapsed: { control: 'boolean' },
    shouldSecondaryContentBeOutside: { control: 'boolean' },
  },
} as ComponentMeta<typeof CollapsibleContainer>;

const Template: ComponentStory<typeof CollapsibleContainer> = (args) => {
  const [ { isCollapsed }, updateArgs ] = useArgs();

  const handleCollapseClick = () => {
    updateArgs({ isCollapsed: !isCollapsed });
  };

  return (
    <CollapsibleContainer
      {...args}
      isCollapsed={isCollapsed}
      handleCollapseClick={handleCollapseClick}
    />
  );
};

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
  const clickableHeader = await canvas.getByTestId('WalletOpenCloseIcon');
  await userEvent.click(clickableHeader);
};

export const ContentOutside = Template.bind({});
ContentOutside.args = {
  label: 'Wallet',
  shouldSecondaryContentBeOutside: true,
  primaryContent: <SampleContent />,
  secondaryContent: <SampleContent />,
};
