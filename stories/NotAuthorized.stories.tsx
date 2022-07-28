import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NotAuthorized from '../components/NotAuthorized';

export default {
  title: 'Components/Not Authorized',
  component: NotAuthorized,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof NotAuthorized>;

const Template: ComponentStory<typeof NotAuthorized> = (args) =>
  <NotAuthorized {...args} />;

export const Default = Template.bind({});
