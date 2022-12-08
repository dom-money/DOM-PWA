import React from 'react';
import { useTheme } from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from './Modal';
import { ThemeType } from '../styles/theme';

interface LoadingProps {
  /**
   * Should Modal with Progress Element be displayed?
   */
  isOpen?: boolean;
  /**
   * Should Progress Element use primary theme color?
   */
  primary?: boolean;
  /**
   * Optional aria-label
   */
  ariaLabel?: string;
};

const Loading = ({ isOpen = false, primary, ariaLabel }: LoadingProps) => {
  const theme = useTheme() as ThemeType;
  return (
    <Modal isOpen={isOpen}>
      <CircularProgress
        aria-label={ariaLabel}
        sx={primary ? { color: theme.colors.primary } : { color: '#ffffff' }}
      />
    </Modal>
  );
};

export default Loading;
