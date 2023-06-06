import React from 'react';
import { StoryFn, Meta, StoryObj } from '@storybook/react';

import Page404Render from '../../components/Page404Render';

export default {
  title: 'Pages/404 Error Page',
  component: Page404Render,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
    controls: { hideNoControlsWarning: true },
  },
} as Meta<typeof Page404Render>;

const Template: StoryFn<typeof Page404Render> = () => <Page404Render />;

type Story = StoryObj<typeof Page404Render>;

export const Default: Story = {
  render: Template,
};
