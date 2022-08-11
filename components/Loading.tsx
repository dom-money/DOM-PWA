import React from 'react';
import styled, { useTheme } from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeType } from '../styles/theme';

interface LoadingProps {
  /**
   * Should Progress Element use primary theme color?
   */
  primary?: boolean;
}

const ModalWrapper = styled.div``;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
`;

const Content = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
  z-index: 2;
`;

const Loading = ({ primary }: LoadingProps) => {
  const theme = useTheme() as ThemeType;
  return (
    <ModalWrapper>
      <Backdrop />
      <Content>
        <CircularProgress
          sx={primary ? { color: theme.colors.primary } : { color: '#ffffff' }}
        />
      </Content>
    </ModalWrapper>
  );
};

export default Loading;
