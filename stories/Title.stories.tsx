import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Title from '../components/Title';

export default {
  title: 'Components/Title',
  component: Title,
  decorators: [
    (Story) => (
      <div style={{
        backgroundColor: '#1F1F1F',
        width: '20rem',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        textAlign: 'center',
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
