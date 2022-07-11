import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AvatarButton from '../components/AvatarButton';

export default {
  title: 'Components/Avatar Button',
  component: AvatarButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{
        display: 'inline-block',
        padding: '2rem',
        backgroundColor: '#1F1F1F',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
      }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof AvatarButton>;

const Template: ComponentStory<typeof AvatarButton> = (args) =>
  <AvatarButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
};
