import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface DialogProps {
  /**
   * Is dialog open?
   */
  isOpen: boolean;
  /**
   * Pass component as a child
   */
  children: React.ReactNode;
  /**
   * On Dialog Close function handler
   */
  onClose?: () => void;
  /**
   * Pass an optional padding value for dialog's content
   */
  padding?: string;
};

const StyledDialog = styled.dialog<{padding: string}>`
  width: 100%;
  max-width: 22rem;
  aspect-ratio: 1/1;
  background-color: #1A1A1A;
  border-radius: 28px;
  padding: ${(props) => props.padding};
  border: none;
  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 
    0px 24px 38px 3px rgba(0,0,0,0.14), 
    0px 9px 46px 8px rgba(0,0,0,0.12);

  &::backdrop {
    background: rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;

const ChildrenContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Dialog = ({
  isOpen,
  children,
  onClose,
  padding = '0',
  ...props
}: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [ isOpen ]);

  const handleDialogOnClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const target = e.target as HTMLDialogElement;
    if (target.closest('#dialog-child-container')) {
      return;
    };
    if (!onClose) {
      return;
    }
    onClose();
  };

  return (
    <StyledDialog
      ref={ref}
      padding={padding}
      onClick={handleDialogOnClick}
      data-testid='dialog'
      {...props}
    >
      <ChildrenContainer id='dialog-child-container'>
        {isOpen && children}
      </ChildrenContainer>
    </StyledDialog>
  );
};

export default Dialog;
