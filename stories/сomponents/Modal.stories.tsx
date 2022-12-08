import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Modal from '../../components/Modal';
import Button from '../../components/Button';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    backgrounds: { default: 'darkAdditional' },
  },
} as ComponentMeta<typeof Modal>;

const Wrapper = styled.div`
  background-color: #e4e4e4;
  width: 500px;
  box-shadow: 10px 10px 10px 1px rgba(0,0,0,0.75);
  padding: 1rem;
`;

const SampleContent = () =>
  <Wrapper>
    <h2>Text in a modal</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
  </Wrapper>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [ { isOpen, onClose }, updateArgs ] = useArgs();
  return (
    <div style={{ width: '20rem' }}>
      <Button
        primary
        onClick={() => {
          updateArgs({ isOpen: true });
        }}
        label='Open Modal'
      />
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={(...params) => {
          updateArgs({ isOpen: false });
          onClose(...params);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args={
  children: <SampleContent />,
  isOpen: false,
};

export const WithoutPortal = Template.bind({});
WithoutPortal.args={
  children: <SampleContent />,
  isOpen: false,
  disablePortal: true,
};

export const WithoutScrollLock = Template.bind({});
WithoutScrollLock.args={
  children: <SampleContent />,
  isOpen: false,
  disableScrollLock: true,
};

export const KeptMounted = Template.bind({});
KeptMounted.args={
  children: <SampleContent />,
  isOpen: false,
  keepMounted: true,
};
