import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { useEffect, useLayoutEffect, useRef, RefObject } from 'react';

const useLockBodyScroll = <T extends HTMLElement>(
  ref: RefObject<T>, // Ref to the element that we want to persist scrolling for
  shouldLock: boolean,
) => {
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    if (!ref.current) return;

    if (shouldLock) disableBodyScroll(ref.current);
    if (!shouldLock && isMounted) enableBodyScroll(ref.current);

    // Clearing scroll locks on unmount
    return clearAllBodyScrollLocks;
  }, [ ref, shouldLock ]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    };
    return;
  }, []);
};

export default useLockBodyScroll;
