import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AvatarButton from '../components/AvatarButton';

export default {
  title: 'Components/Avatar Button',
  component: AvatarButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof AvatarButton>;

const Template: ComponentStory<typeof AvatarButton> = (args) =>
  <AvatarButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageURL: 'https://randomuser.me/api/portraits/women/90.jpg',
};
