import React from 'react';
import { StoryFn, Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import CollapsibleContainer from '../../components/CollapsibleContainer';

export default {
  title: 'Components/Collapsible Container',
  component: CollapsibleContainer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isCollapsed: { control: 'boolean' },
    onCollapseClick: { action: `'Collapse' Button Clicked` },
    shouldSecondaryContentBeOutside: { control: 'boolean' },
  },
} as Meta<typeof CollapsibleContainer>;

const SampleContent = () => {
  return <h3 style={{ color: 'white', fontWeight: 500 }}>Sample Content</h3>;
};

const Template: StoryFn<typeof CollapsibleContainer> = (args) => {
  const [ { isCollapsed, onCollapseClick }, updateArgs ] = useArgs();

  const handleCollapseClick = () => {
    updateArgs({ isCollapsed: !isCollapsed });
    onCollapseClick();
  };

  return (
    <CollapsibleContainer
      { ...args }
      isCollapsed={ isCollapsed }
      onCollapseClick={ handleCollapseClick }
    />
  );
};

type Story = StoryObj<typeof CollapsibleContainer>;

export const Closed: Story = {
  render: Template,

  args: {
    label: 'Wallet',
    primaryContent: <SampleContent />,
    secondaryContent: <SampleContent />,
  },
};

export const Open: Story = {
  render: Template,

  args: {
    label: 'Wallet',
    isCollapsed: true,
    primaryContent: <SampleContent />,
    secondaryContent: <SampleContent />,
  },
};

export const ContentOutside: Story = {
  render: Template,

  args: {
    label: 'Wallet',
    shouldSecondaryContentBeOutside: true,
    primaryContent: <SampleContent />,
    secondaryContent: <SampleContent />,
  },
};

export const NoSecondaryContent: Story = {
  render: Template,

  args: {
    label: 'Wallet',
    primaryContent: <SampleContent />,
  },
};

export const NoSecondaryContentButActive: Story = {
  render: Template,

  args: {
    label: 'Wallet',
    primaryContent: <SampleContent />,
    shouldCollapseButtonBeAlwaysActive: true,
  },
};
