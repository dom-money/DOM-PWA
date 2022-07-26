import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InvestButton from '../components/InvestButton';

export default {
  title: 'Components/Invest Button',
  component: InvestButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      inlineStories: false,
      iframeHeight: 250,
    },
  },
} as ComponentMeta<typeof InvestButton>;

const Template: ComponentStory<typeof InvestButton> = (args) =>
  <InvestButton {...args} />;

export const Default = Template.bind({});
