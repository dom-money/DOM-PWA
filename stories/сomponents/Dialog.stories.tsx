import React from 'react';
import { StoryFn, Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Dialog from '../../components/Dialog';
import Button from '../../components/Button';
import theme from '../../styles/theme';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    onClose: { action: 'Dialog Closed' },
  },
} as Meta<typeof Dialog>;

const SampleComponent = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: theme.colors.primary,
    }}
  >
    <p>Sample Content</p>
    <p>Filled with primary color</p>
  </div>
);

const Template: StoryFn<typeof Dialog> = (args) => {
  const [ { isOpen, onClose }, updateArgs ] = useArgs();
  return (
    <div style={{ width: '20rem' }}>
      <Button
        primary
        onClick={ () => {
          updateArgs({ isOpen: true });
        } }
        label="Open Dialog"
      />
      <Dialog
        { ...args }
        isOpen={ isOpen }
        onClose={ () => {
          updateArgs({ isOpen: false });
          onClose();
        } }
      />
    </div>
  );
};

type Story = StoryObj<typeof Dialog>;

export const WithoutPadding: Story = {
  render: Template,

  args: {
    isOpen: false,
    children: <SampleComponent />,
  },
};

export const WithPadding: Story = {
  render: Template,

  args: {
    isOpen: false,
    children: <SampleComponent />,
    padding: '1.25rem',
  },
};
