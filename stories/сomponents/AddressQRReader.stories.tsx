import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';

import AddressQRReader from '../../components/AddressQRReader';
import IconButton from '../../components/IconButton';
import ScanQRIcon from '../../styles/icons/ScanQRIcon';

export default {
  title: 'Components/Address QR Reader',
  component: AddressQRReader,
  parameters: {
    backgrounds: { default: 'darkAdditional' },
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
} as ComponentMeta<typeof AddressQRReader>;

const Wrapper = styled.div`
  position: relative;
`;

const AddressWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  color: #ffffff;
`;

const Template: ComponentStory<typeof AddressQRReader> = (args) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ address, setAddress ] = useState('');

  const handleResult = (result: string) => {
    setAddress(result);
    handleClose();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <IconButton
        size='large'
        backgroundColor='#020202'
        ariaLabel='Scan QR'
        onClick={handleOpen}
      >
        <ScanQRIcon color='#FFFFFF'/>
      </IconButton>
      {
        address &&
      <AddressWrapper>
        <p style={{ fontWeight: 'bold' }}>Wallet address:</p>
        <p>{address}</p>
      </AddressWrapper>
      }
      <AddressQRReader
        {...args}
        isOpen={isOpen}
        onResult={handleResult}
        onClose={handleClose}
      />
    </Wrapper>);
};

export const Default = Template.bind({});
