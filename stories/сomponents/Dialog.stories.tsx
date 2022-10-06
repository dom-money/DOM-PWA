import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof Dialog>;

const SampleComponent = () =>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.colors.primary,
  }}>
    <p>Sample Content</p>
    <p>Filled with primary color</p>
  </div>;

const Template: ComponentStory<typeof Dialog> = (args) => {
  const [ { isOpen, onClose }, updateArgs ] = useArgs();
  return (
    <div style={{ width: '20rem' }}>
      <Button
        primary
        onClick={() => {
          updateArgs({ isOpen: true });
        }}
        label='Open Dialog'
      />
      <Dialog {...args} isOpen={isOpen} onClose={() => {
        updateArgs({ isOpen: false });
        onClose();
      }}/>
    </div>
  );
};

export const WithoutPadding = Template.bind({});
WithoutPadding.args = {
  isOpen: false,
  children: <SampleComponent />,
};

export const WithPadding = Template.bind({});
WithPadding.args = {
  isOpen: false,
  children: <SampleComponent />,
  padding: '1.25rem',
};
