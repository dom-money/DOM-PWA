import React from 'react';
import styled from 'styled-components';

import GenericContainer from './GenericContainer';
import IconButton from './IconButton';
import ContactsIcon from '../styles/icons/ContactsIcon';
import ScanQRIcon from '../styles/icons/ScanQRIcon';

interface AddressInputProps {
  /**
   * Label text
   */
  label: string;
  /**
   * Address value (input's state)
   */
  addressValue: string;
  /**
   * HTML \<input\> id Attribute
   */
  inputID: string;
  /**
   * Input on value change handler function
   */
  onValueChange?: (addressValue: string) => void;
  /**
   * Input on focus (when empty) handler function
   */
  onFocus?: (prefill?: string) => void;
  /**
   * Optional string to be used as a mask
   */
  mask?: string;
  /**
   * 'Get Contact' Button Click handler
   */
  getContactOnClick?: () => void;
  /**
   * 'Scan QR' Button Click handler
   */
  scanQROnClick?: () => void;
  /**
   * Optional string to be used as a pre-fill
   */
  prefill?: string;
  /**
   * Is input disabled
   */
  disabled?: boolean;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.625rem;
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TextInput = styled.input`
  font-family: ${(props) => props.theme.fontFamilyMono};
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  width: 42ch;
  min-width: 100%;
  display: inline-block;
  padding: 0;
  margin-block-start: 0px;
  margin-block-end: 0px;
  color: #FFFFFF;

  &:focus-visible {
    outline: none;
  };
`;

const MaskContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  user-select: none;
`;

const Mask = styled.span`
  font-family: ${(props) => props.theme.fontFamilyMono};
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  color: #F8F8F8;
  opacity: 0.3;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;

const MaskHidden = styled(Mask)`
  visibility: hidden;
`;

const AddressInput = ({
  label,
  addressValue,
  inputID,
  onValueChange,
  onFocus,
  mask = '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  getContactOnClick,
  scanQROnClick,
  prefill,
  disabled,
}: AddressInputProps) => {
  const maskToDisplay = mask.slice(addressValue.length);

  if (disabled) {
    return (
      <GenericContainer
        label={ label }
        titleHtmlElement='label'
        inputID={ inputID }
        content={
          <Container>
            <InputWrapper tabIndex={ 0 }>
              <TextInput
                id={ inputID }
                spellCheck={ false }
                value={ addressValue }
                disabled
              />
              <MaskContainer>
                <MaskHidden>{ addressValue }</MaskHidden>
                <Mask>{ maskToDisplay }</Mask>
              </MaskContainer>
            </InputWrapper>
            <IconContainer>
              <IconButton
                size='large'
                backgroundColor='#020202'
                ariaLabel='Disabled "Get Contact" Button'
                disabled
              >
                <ContactsIcon color='#ffffff' />
              </IconButton>
              <IconButton
                size='large'
                backgroundColor='#020202'
                ariaLabel='Disabled "Scan QR" Button'
                disabled
              >
                <ScanQRIcon color='#ffffff' />
              </IconButton>
            </IconContainer>
          </Container>
        }
      />
    );
  };

  const isAddressValueAllowed = (addressValue: string) => {
    const allowedValuePattern = /^(?:0|0x|0x[\da-f]{1,40})$/i;

    // Checking if address value matches allowed pattern
    if (allowedValuePattern.test(addressValue)) {
      return true;
    };
    // Checking if address value is empty
    if (addressValue.length === 0) {
      return true;
    };
  };

  const hasAddressValueValidAddress = (addressValue: string) => {
    if (addressValue.length <= 42) {
      return null;
    };
    const fullAddressPattern = /0x[\da-f]{40}/i;
    // Checking if a valid address can be extracted from an address value
    const matchedAddress = addressValue.match(fullAddressPattern)?.[ 0 ];
    if (!matchedAddress) {
      return null;
    };
    return matchedAddress;
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetAddressValue = e.target.value;
    // Checking if there's an onValueChange handler passed via props
    if (!onValueChange) {
      return;
    };
    // Checking if new value is a valid address pasted with additional ...
    // .. symbols and extracting valid address
    const matchedAddress = hasAddressValueValidAddress(targetAddressValue);
    if (matchedAddress) {
      return onValueChange(matchedAddress);
    };
    // Checking if new value is allowed
    if (!isAddressValueAllowed(targetAddressValue)) {
      return;
    };
    onValueChange(targetAddressValue);
  };

  const handleInputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Checking if there's an onFocus handler passed via props
    if (!onFocus) {
      return;
    };
    // Checking if input is empty
    if (e.target.value.length > 0) {
      return;
    };
    // Calling callback function and passing optional prefill
    onFocus(prefill);
  };

  return (
    <GenericContainer
      label={ label }
      titleHtmlElement='label'
      inputID={ inputID }
      content={
        <Container>
          <InputWrapper>
            <TextInput
              autoFocus
              autoComplete='off'
              id={ inputID }
              spellCheck={ false }
              value={ addressValue }
              onChange={ handleInputOnChange }
              onFocus={ handleInputOnFocus }
            />
            <MaskContainer>
              <MaskHidden>{ addressValue }</MaskHidden>
              <Mask>{ maskToDisplay }</Mask>
            </MaskContainer>
          </InputWrapper>
          <IconContainer>
            <IconButton
              size='large'
              backgroundColor='#020202'
              ariaLabel='Get Contact'
              onClick={ getContactOnClick }
            >
              <ContactsIcon color='#ffffff' />
            </IconButton>
            <IconButton
              size='large'
              backgroundColor='#020202'
              ariaLabel='Scan QR'
              onClick={ scanQROnClick }
            >
              <ScanQRIcon color='#ffffff' />
            </IconButton>
          </IconContainer>
        </Container>
      }
    />
  );
};

export default AddressInput;
