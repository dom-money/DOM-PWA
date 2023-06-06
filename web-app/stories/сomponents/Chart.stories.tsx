import { Meta, StoryObj } from '@storybook/react';

import Chart from '../../components/Chart';

export default {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as Meta<typeof Chart>;

type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  args: {
    data: Array.from(Array(7 * 8), (_, index) => {
      const randomValue = Math.round(Math.random() * 100);
      return {
        // Every 3 hours for the last week
        date: new Date(new Date().getTime() - 3600 * 3 * 1000 * index),
        value: randomValue,
        label: `+$${ randomValue }`,
      };
    }),
  },
};
