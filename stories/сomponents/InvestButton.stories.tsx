import { Meta, StoryObj } from '@storybook/react';
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
} as Meta<typeof InvestButton>;

type Story = StoryObj<typeof InvestButton>;

export const Default: Story = {
  args: {
    href: '/invest',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const linkButton = canvas.getByRole('link');

    await waitFor(() => expect(linkButton).toHaveAttribute('href', '/invest'));
  },
};
