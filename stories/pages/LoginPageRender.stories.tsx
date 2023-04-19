import { Meta, StoryObj } from '@storybook/react';

import LoginPageRender from '../../components/LoginPageRender';

export default {
  title: 'Pages/Login Page',
  component: LoginPageRender,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
    controls: {
      hideNoControlsWarning: true,
    },
  },
} as Meta<typeof LoginPageRender>;

type Story = StoryObj<typeof LoginPageRender>;

export const Default: Story = {};
