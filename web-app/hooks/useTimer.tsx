import { useState, useEffect, useRef, useCallback } from 'react';

const useTimer = (cancelOnUnmount = true) => {
  const [
    remainingSeconds,
    setRemainingSeconds,
  ] = useState<number | null>(null);

  const countingSecondsInterval =
    useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!cancelOnUnmount) return;

    return () => {
      if (countingSecondsInterval.current) {
        clearInterval(countingSecondsInterval.current);
      }
    };
  }, [ cancelOnUnmount ]);

  const setEndTime = useCallback((endTime: number) => {
    if (countingSecondsInterval.current) {
      clearInterval(countingSecondsInterval.current);
    };

    const currentTime = Date.now();

    const remainingTimeRoundedToSec =
        Math.round((endTime - currentTime) / 1000);

    if (remainingTimeRoundedToSec <= 0) return;

    setRemainingSeconds(remainingTimeRoundedToSec);

    countingSecondsInterval.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        const currentTime = Date.now();

        const remainingTimeRoundedToSec =
          Math.round((endTime - currentTime) / 1000);

        if (remainingTimeRoundedToSec <= 0) return 0;

        return remainingTimeRoundedToSec;
      });
    }, 1000);
  }, []);

  return { setEndTime, remainingSeconds };
};

export default useTimer;
