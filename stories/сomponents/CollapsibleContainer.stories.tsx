import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof CollapsibleContainer>;

const SampleContent = () => {
  return (
    <h3 style={{ color: 'white', fontWeight: 500 }}>Sample Content</h3>
  );
};

const Template: ComponentStory<typeof CollapsibleContainer> = (args) => {
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

export const Closed = Template.bind({});
Closed.args = {
  label: 'Wallet',
  primaryContent: <SampleContent />,
  secondaryContent: <SampleContent />,
};

export const Open = Template.bind({});
Open.args = {
  label: 'Wallet',
  isCollapsed: true,
  primaryContent: <SampleContent />,
  secondaryContent: <SampleContent />,
};

export const ContentOutside = Template.bind({});
ContentOutside.args = {
  label: 'Wallet',
  shouldSecondaryContentBeOutside: true,
  primaryContent: <SampleContent />,
  secondaryContent: <SampleContent />,
};

export const NoSecondaryContent = Template.bind({});
NoSecondaryContent.args = {
  label: 'Wallet',
  primaryContent: <SampleContent />,
};

export const NoSecondaryContentButActive = Template.bind({});
NoSecondaryContentButActive.args = {
  label: 'Wallet',
  primaryContent: <SampleContent />,
  shouldCollapseButtonBeAlwaysActive: true,
};
