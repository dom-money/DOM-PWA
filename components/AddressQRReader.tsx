import React from 'react';
import { QrReader, QrReaderProps } from 'react-qr-reader';
import styled from 'styled-components';

import Dialog from './Dialog';
import QrViewportSVG from '../styles/svg/QrViewportSVG';

interface AddressQRReaderProps {
  /**
   * Is dialog open?
   */
  isOpen: boolean;
  /**
   * On Result function handler
   */
  onResult?: (result: string) => void;
  /**
   * On Dialog Close function handler
   */
  onClose?: () => void;
};

const StyledQrReader = styled(QrReader)`
  width: 100%;
`;

const ViewFinderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ViewFinder = () => {
  return (
    <ViewFinderContainer>
      <QrViewportSVG color='#ffffff'/>
    </ViewFinderContainer>
  );
};

const AddressQRReader = ({
  isOpen,
  onResult,
  onClose,
}: AddressQRReaderProps) => {
  const handleResult: QrReaderProps['onResult'] = (result) => {
    if (!result || !onResult) {
      return;
    };

    // @ts-ignore
    const qrScanResultText = result.text as string;
    const addressFinalValidationPattern = /^0x[\da-f]{40}$/i;

    if (!addressFinalValidationPattern.test(qrScanResultText)) {
      return;
    };
    onResult(qrScanResultText);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      data-testid='cameraDialog'
    >
      <StyledQrReader
        constraints={{ facingMode: 'environment' }}
        onResult={handleResult}
        ViewFinder={() => <ViewFinder />}
        videoStyle={{
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
        }}
      />
    </Dialog>
  );
};

export default AddressQRReader;
