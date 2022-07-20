import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeaderGoBack from '../components/HeaderGoBack';

export default {
  title: 'Components/Header with \'go back\' button',
  component: HeaderGoBack,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{
        padding: '2rem',
        backgroundColor: '#1F1F1F',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
      }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof HeaderGoBack>;

const Template: ComponentStory<typeof HeaderGoBack> = (args) =>
  <HeaderGoBack {...args} />;

export const Default = Template.bind({});
