import React, { useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import styled from 'styled-components';

import AddressQRReader from '../../components/AddressQRReader';
import IconButton from '../../components/IconButton';
import ScanQRIcon from '../../styles/icons/ScanQRIcon';

export default {
  title: 'Components/Address QR Reader',
  component: AddressQRReader,
  argTypes: {
    isOpen: { control: 'boolean' },
    onResult: { action: 'QR Successfully scanned' },
    onClose: { action: 'QR Scanner Closed' },
  },
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
  const [ { isOpen, onResult, onClose }, updateArgs ] = useArgs();

  const address = useRef<string | null>(null);

  const handleResult = (result: string) => {
    address.current = result;
    updateArgs({ isOpen: false });
    onResult(result);
  };

  const handleOpen = () => {
    updateArgs({ isOpen: true });
  };

  const handleClose = () => {
    updateArgs({ isOpen: false });
    onClose();
  };

  return (
    <Wrapper>
      <IconButton
        size='large'
        backgroundColor='#020202'
        ariaLabel='Scan QR'
        onClick={ handleOpen }
      >
        <ScanQRIcon color='#FFFFFF'/>
      </IconButton>
      {
        address.current &&
      <AddressWrapper>
        <p style={{ fontWeight: 'bold' }}>Wallet address:</p>
        <p>{ address.current }</p>
      </AddressWrapper>
      }
      <AddressQRReader
        { ...args }
        isOpen={ isOpen }
        onResult={ handleResult }
        onClose={ handleClose }
      />
    </Wrapper>);
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
};
