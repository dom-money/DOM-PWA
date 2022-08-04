import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoadingPage from '../components/LoadingPage';

export default {
  title: 'Pages/Loading Page',
  component: LoadingPage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
} as ComponentMeta<typeof LoadingPage>;

const Template: ComponentStory<typeof LoadingPage> = () =>
  <LoadingPage/>;

export const Default = Template.bind({});
