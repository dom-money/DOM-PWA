import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
} as ComponentMeta<typeof Page404Render>;

const Template: ComponentStory<typeof Page404Render> = () =>
  <Page404Render/>;

export const Default = Template.bind({});
