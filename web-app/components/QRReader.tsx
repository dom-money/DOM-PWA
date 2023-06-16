import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Html5Qrcode,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from 'html5-qrcode';
import QrViewportSVG from '../styles/svg/QrViewportSVG';

interface Props {
  /**
   * On QR Reader Success function handler
   */
  onSuccess: QrcodeSuccessCallback;
  /**
   * On QR Reader Error function handler
   */
  onError?: QrcodeErrorCallback;
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

const QRReader = ({
  onSuccess,
  onError,
}: Props) => {
  useEffect(() => {
    const html5QrcodeScanner = new Html5Qrcode('reader');
    const didStart = html5QrcodeScanner.start(
        { facingMode: 'environment' },
        { fps: 10, aspectRatio: 1/1 },
        onSuccess,
        onError,
    ).then(() => true);
    return () => {
      didStart
          .then(() => html5QrcodeScanner.stop())
          .catch(() => {
            console.log('Error stopping scanner');
          });
    };
  }, [ onSuccess, onError ]);

  return (
    <>
      <div id="reader"></div>
      <ViewFinder />
    </>
  );
};

export default QRReader;
