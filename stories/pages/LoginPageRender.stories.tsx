import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginPageRender from '../../components/LoginPageRender';

export default {
  title: 'Pages/Login Page',
  component: LoginPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
} as ComponentMeta<typeof LoginPageRender>;

const Template: ComponentStory<typeof LoginPageRender> = (args) =>
  <LoginPageRender {...args} />;

export const Default = Template.bind({});
