import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Title from '../components/Title';

export default {
  title: 'Components/Title',
  component: Title,
  decorators: [
    (Story) => (
      <div style={{
        display: 'inline-block',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#1F1F1F',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
      }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Wallet',
};
