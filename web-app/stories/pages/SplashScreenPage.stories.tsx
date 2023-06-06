import React from 'react';
import { StoryFn, Meta, StoryObj } from '@storybook/react';

import SplashScreenPage from '../../components/SplashScreenPage';

export default {
  title: 'Pages/Splash Screen Page',
  component: SplashScreenPage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
    controls: { hideNoControlsWarning: true },
  },
} as Meta<typeof SplashScreenPage>;

const Template: StoryFn<typeof SplashScreenPage> = () => <SplashScreenPage />;

type Story = StoryObj<typeof SplashScreenPage>;

export const Default: Story = {
  render: Template,
};
