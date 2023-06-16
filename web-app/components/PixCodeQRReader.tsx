import React, { useCallback } from 'react';
import { QrcodeSuccessCallback } from 'html5-qrcode';
import styled from 'styled-components';
import { parse } from 'pixcode';

import Dialog from './Dialog';
import QRReader from './QRReader';
import QrViewportSVG from '../styles/svg/QrViewportSVG';
import { PIXCode } from 'pixcode/lib/pixcode';

interface Props {
  /**
   * Is dialog open?
   */
  isOpen: boolean;
  /**
   * On Result function handler
   */
  onResult?: (pixCode: PIXCode, qrData: string) => void;
  /**
   * On Dialog Close function handler
   */
  onClose?: () => void;
};

const ViewFinderContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

const ViewFinder = () => {
  return (
    <ViewFinderContainer>
      <QrViewportSVG color='#ffffff'/>
    </ViewFinderContainer>
  );
};

const PixCodeQRReader = ({
  isOpen,
  onResult,
  onClose,
}: Props) => {
  const handleResult: QrcodeSuccessCallback = useCallback((decodedText) => {
    if (!decodedText || !onResult || !onClose) return;

    try {
      const parsedQr = parse(decodedText);
      onResult(parsedQr, decodedText);

      onClose();
    } catch (error) {
      console.log(error);
    };
  }, [ onClose, onResult ]);

  return (
    <Dialog
      isOpen={ isOpen }
      onClose={ onClose }
      data-testid='cameraDialog'
    >
      <QRReader onSuccess={ handleResult } />
      <ViewFinder />
    </Dialog>
  );
};

export default PixCodeQRReader;
