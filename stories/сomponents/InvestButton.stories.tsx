import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import InvestButton from '../../components/InvestButton';

export default {
  title: 'Components/Invest Button',
  component: InvestButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      inlineStories: false,
      iframeHeight: 250,
    },
  },
} as ComponentMeta<typeof InvestButton>;

const Template: ComponentStory<typeof InvestButton> = (args) =>
  <InvestButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: '/invest',
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const linkButton = canvas.getByRole('link');

  await waitFor(() => expect(linkButton).toHaveAttribute('href', '/invest'));
};
