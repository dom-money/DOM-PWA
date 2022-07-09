import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IconButtonCircular from '../components/IconButtonCircular';

import ArrowDownIcon from '../styles/icons/ArrowDownIcon';

export default {
  title: 'Components/Icon Button Circular',
  component: IconButtonCircular,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1F1F1F', padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof IconButtonCircular>;

const Template: ComponentStory<typeof IconButtonCircular> = (args) =>
  <IconButtonCircular {...args} />;

export const Button = Template.bind({});
Button.args = {
  children: <ArrowDownIcon color="#F8F8F8" opacity="0.3"/>,
};
