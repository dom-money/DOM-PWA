import React from 'react';
import styled from 'styled-components';
import { StoryFn, Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Modal from '../../components/Modal';
import Button from '../../components/Button';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as Meta<typeof Modal>;

const Wrapper = styled.div`
  background-color: #e4e4e4;
  width: 500px;
  box-shadow: 10px 10px 10px 1px rgba(0, 0, 0, 0.75);
  padding: 1rem;
`;

const SampleContent = () => (
  <Wrapper>
    <h2>Text in a modal</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </Wrapper>
);

const Template: StoryFn<typeof Modal> = (args) => {
  const [ { isOpen, onClose }, updateArgs ] = useArgs();
  return (
    <div style={{ width: '20rem' }}>
      <Button
        primary
        onClick={ () => {
          updateArgs({ isOpen: true });
        } }
        label="Open Modal"
      />
      <Modal
        { ...args }
        isOpen={ isOpen }
        onClose={ (...params) => {
          updateArgs({ isOpen: false });
          onClose(...params);
        } }
      />
    </div>
  );
};

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: Template,

  args: {
    children: <SampleContent />,
    isOpen: false,
  },
};

export const WithoutPortal: Story = {
  render: Template,

  args: {
    children: <SampleContent />,
    isOpen: false,
    disablePortal: true,
  },
};

export const WithoutScrollLock: Story = {
  render: Template,

  args: {
    children: <SampleContent />,
    isOpen: false,
    disableScrollLock: true,
  },
};

export const KeptMounted: Story = {
  render: Template,

  args: {
    children: <SampleContent />,
    isOpen: false,
    keepMounted: true,
  },
};
