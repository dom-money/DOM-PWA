import { Meta, StoryObj } from '@storybook/react';

import Title from '../../components/Title';

export default {
  title: 'Components/Title',
  component: Title,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    inputID: {
      if: { arg: 'as', eq: 'label' },
    },
  },
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as Meta<typeof Title>;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    text: 'Wallet',
  },
};

export const AsParagraph: Story = {
  args: {
    text: 'Wallet',
    as: 'p',
  },
};

export const AsLabel: Story = {
  args: {
    text: 'Amount Input',
    as: 'label',
    inputID: 'test-amount-input',
  },
};
