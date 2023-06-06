import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  /**
   * DOM node where children will be rendered. Default: `document.body`
   */
  container?: HTMLElement;
  /**
   * The children to render into the `container`
   */
  children: React.ReactNode;
};

const Portal = ({ container = document.body, children }: PortalProps) => {
  return ReactDOM.createPortal(children, container);
};

export default Portal;
