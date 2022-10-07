import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
} as ComponentMeta<typeof SplashScreenPage>;

const Template: ComponentStory<typeof SplashScreenPage> = () =>
  <SplashScreenPage/>;

export const Default = Template.bind({});
