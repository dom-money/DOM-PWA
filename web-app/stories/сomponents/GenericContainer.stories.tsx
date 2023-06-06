import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import GenericContainer from '../../components/GenericContainer';

export default {
  title: 'Components/Generic Container',
  component: GenericContainer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof GenericContainer>;

const SampleContent = () => {
  return <h3 style={{ color: 'white', fontWeight: 500 }}>Sample Content</h3>;
};

type Story = StoryObj<typeof GenericContainer>;

export const Default: Story = {
  args: {
    label: 'Your Address To Receive Funds',
    content: <SampleContent />,
  },
};

export const AsInputContainer: Story = {
  args: {
    label: 'Enter Amount To Transfer',
    content: <SampleContent />,
    titleHtmlElement: 'label',
    inputID: 'default-input-id',
  },
};
