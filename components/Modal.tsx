import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useOnKeyDown from '../hooks/useOnKeyDown';
import Portal from './Portal';

interface ModalProps {
  /**
   * Should Modal be shown?
   */
  isOpen: boolean;
  /**
   * Content of the Modal
   */
  children: React.ReactNode;
  /**
   * The children will be under the DOM hierarchy of the parent component.
   */
  disablePortal?: boolean;
  /**
   * Should background scroll be allowed?
   */
  disableScrollLock?: boolean;
  /**
   * Should Modal be kept mounted when not open?
   */
  keepMounted?: boolean;
  /**
   * On Modal Close function handler
   */
  onClose?: (
    event: MouseEvent | TouchEvent | KeyboardEvent,
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => void;
};

const ModalRoot = styled.div<{isOpen: boolean}>`
  position: fixed;
  inset: 0;
  ${(props) => !props.isOpen && `
    visibility: hidden;
  `};
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const Modal = ({
  isOpen,
  children,
  disablePortal = false,
  disableScrollLock = false,
  keepMounted = false,
  onClose,
}: ModalProps) => {
  // Locking body scroll when modal is open and this option is not disabled
  const shouldLock = isOpen && !disableScrollLock;

  // Ref for the target element that we want to persist scrolling for
  const ref = useRef<HTMLDivElement>(null);

  const onBackdropClickHandler = useCallback(
      (event: MouseEvent | TouchEvent) => {
        if (!onClose) return;
        onClose(event, 'backdropClick' );
      }, []);

  const onEscapeKeyDownHandler = useCallback(
      (event: KeyboardEvent) => {
        if (!onClose) return;
        onClose(event, 'escapeKeyDown' );
      }, []);

  useLockBodyScroll<HTMLDivElement>(ref, shouldLock);

  useOnClickOutside<HTMLDivElement>(ref, onBackdropClickHandler);
  useOnKeyDown(onEscapeKeyDownHandler, 'Escape');

  if (!isOpen && !keepMounted) return null;

  if (disablePortal) {
    return (
      <ModalRoot isOpen={isOpen}>
        <Backdrop />
        <ContentWrapper ref={ref}>
          {children}
        </ContentWrapper>
      </ModalRoot>
    );
  };

  return (
    <Portal>
      <ModalRoot isOpen={isOpen}>
        <Backdrop />
        <ContentWrapper ref={ref}>
          {children}
        </ContentWrapper>
      </ModalRoot>
    </Portal>
  );
};

export default Modal;
