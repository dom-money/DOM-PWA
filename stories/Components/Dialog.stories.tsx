import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dialog from '../../components/Dialog';
import Button from '../../components/Button';
import theme from '../../styles/theme';

export default {
  title: 'Components/Dialog',
  component: Dialog,
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
  const [ isOpen, setIsOpen ] = useState(false);
  return (
    <div style={{ width: '20rem' }}>
      <Button
        primary
        onClick={() => {
          setIsOpen(true);
        }}
        label='Open Dialog'
      />
      <Dialog {...args} isOpen={isOpen} onClose={() => {
        setIsOpen(false);
      }}/>
    </div>
  );
};

export const WithoutPadding = Template.bind({});
WithoutPadding.args = {
  children: <SampleComponent />,
};

export const WithPadding = Template.bind({});
WithPadding.args = {
  children: <SampleComponent />,
  padding: '1.25rem',
};
