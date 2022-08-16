import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Title from './Title';
import Button from './Button';
import PaymentStatusSuccessSVG from '../styles/svg/PaymentStatusSuccessSVG';
import PaymentStatusFailedSVG from '../styles/svg/PaymentStatusFailedSVG';

type PaymentStatusType = 'successful' | 'failed';

interface PaymentStatusProps {
  /**
   * Type of Payment Status
   */
  type: PaymentStatusType;
  /**
   * Is Drawer Open?
   */
  isOpen: boolean;
  /**
   * On Drawer Close Handler Function
   */
  onClose?: () => void;
  /**
   * On Exited (Component unmount) Handler Function
   */
  onExited?: (node: HTMLElement) => void,
  /**
   * Receiver of the payment
   */
  paymentTo: string;
  /**
   * Amount of the payment
   */
  amount: string;
  /**
   * Payment message
   */
  message?: string;
  /**
   * Error message
   */
  errorMessage?: string;
  /**
   * 'Send Again' Button On Click Handler
   */
  sendAgainOnClick?: () => void;
  /**
   * 'Try Again' Button On Click Handler
   */
  tryAgainOnClick?: () => void;
};

interface BackdropProps {
  /**
   * Type of Payment Status
   */
  type: PaymentStatusType;
  /**
   * Bottom margin value for Backdrop Content
   */
  marginBottom: number;
};

const iOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const ColoredAreaWrapper = styled.div`
  background-color: #1F1F1F;
`;

const Puller = styled.div`
  width: 2.5rem;
  height: 0.25rem;
  margin-inline: auto;
  margin-top: 0.75rem;
  background-color: #ffffff;
  opacity: 0.2;
  border-radius: 6px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 1.25rem;
  margin-top: 1.5rem;
`;

const StatusTitle = styled.h1<{type: PaymentStatusType}>`
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  text-transform: capitalize;
  margin-inline: auto;
  margin-top: 0;
  margin-bottom: 2rem;
  color: ${(props) => {
    if (props.type === 'successful') {
      return props.theme.colors.success;
    };
    if (props.type === 'failed') {
      return props.theme.colors.danger;
    };
  }};
`;

const DataContainer = styled.ul`
  list-style-type: none;
  margin: 0 0 1.875rem;
  padding: 0;
`;

const DataItem = styled.li`
  width: 100%;
`;

const TitleWithMargin = styled(Title)`
  margin-bottom: 0.375rem;
`;

const Text = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  text-transform: capitalize;
  color: #FFFFFF;
  margin: 0;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Divider = styled.li`
  border-style: solid;
  border-bottom-width: 0.6px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  border-color: #FFFFFF;
  opacity: 0.2;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.375rem;
  padding: 0.313rem;
  @media screen and (min-height: 700px) {
    margin-bottom: 4.688rem;
  }
`;

const BackdropContent = styled.div<{marginBottom: number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px`};
`;

const Backdrop = ({ type, ...props }: BackdropProps) =>
  <BackdropContent {...props} >
    {type === 'successful' &&
        <PaymentStatusSuccessSVG />
    }
    {type === 'failed' &&
        <PaymentStatusFailedSVG />
    }
  </BackdropContent>;

const PaymentStatus = ({
  type,
  isOpen,
  onClose = () => {},
  onExited,
  paymentTo,
  amount,
  message,
  errorMessage,
  sendAgainOnClick,
  tryAgainOnClick,
}: PaymentStatusProps) => {
  const [
    drawerPaperHeight,
    setDrawerPaperHeight,
  ] = useState(0);

  const [ windowHeight, setWindowHeight ] = useState(0);

  // Catching window resize
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWindowHeight = window.innerHeight;
      setWindowHeight(newWindowHeight);
    };

    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  // Getting Paper's height
  const drawerPaperRef = useCallback((node) => {
    if (node === null) {
      return;
    };
    setDrawerPaperHeight(node.children[ 2 ].clientHeight);
  }, [ windowHeight ]);

  return (
    <SwipeableDrawer
      ref={drawerPaperRef}
      anchor={'bottom'}
      open={isOpen}
      onClose={onClose}
      onOpen={() => {}}
      disableBackdropTransition={!iOS}
      disableDiscovery={true}
      disableSwipeToOpen={true}
      ModalProps={{
        componentsProps: { backdrop: {
          children: <Backdrop type={type} marginBottom={drawerPaperHeight} />,
        } },
      }}
      SlideProps={{
        mountOnEnter: true,
        unmountOnExit: true,
        onExited: onExited,
      }}
      sx={(theme) => ({
        '.MuiDrawer-paper': {
          backgroundColor: 'transparent',
          borderRadius: '32px 32px 0px 0px',
          maxHeight: '75%',
          marginInline: 'auto',
          [ theme.breakpoints.up('lg') ]: {
            minWidth: '40rem',
            maxWidth: 'fit-content',
          },
        },
        '.MuiBackdrop-root': {
          display: 'flex',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)',
        },
      })}
    >
      <ColoredAreaWrapper>
        <Puller />
        <ContentWrapper>
          <StatusTitle type={type}>
            {type === 'successful' && 'Successful'}
            {type === 'failed' && 'Payment Failed'}
          </StatusTitle>
          <DataContainer>
            <DataItem>
              <TitleWithMargin text='Your Payment To' />
              <Text>
                {paymentTo}
              </Text>
            </DataItem>
            <Divider />
            <DataItem>
              <TitleWithMargin text='Amount' />
              <Text>
                ${amount}
              </Text>
            </DataItem>
            <Divider />
            {type === 'successful' &&
                <DataItem>
                  <TitleWithMargin text='Message' />
                  <Text>
                    {message}
                  </Text>
                </DataItem>
            }
            {type === 'failed' &&
              <DataItem>
                <TitleWithMargin text='Error' />
                <Text>
                  {errorMessage}
                </Text>
              </DataItem>
            }
          </DataContainer>
        </ContentWrapper>
      </ColoredAreaWrapper>
      {type === 'successful' &&
        <ButtonsContainer>
          <Button primary label='Send Again' onClick={sendAgainOnClick}/>
          <Button label='Next' asAnchor href='/'/>
        </ButtonsContainer>
      }
      {type === 'failed' &&
        <ButtonsContainer>
          <Button primary label='Try Again' onClick={tryAgainOnClick}/>
          <Button label='Home' asAnchor href='/'/>
        </ButtonsContainer>
      }
    </SwipeableDrawer>
  );
};

export default PaymentStatus;
