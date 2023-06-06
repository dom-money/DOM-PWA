import { useEffect } from 'react';

type EventType = KeyboardEvent;

type HandlerType = (event: EventType) => void;

const useOnKeyDown = (
    handler: HandlerType,
    pressedKey: KeyboardEvent['key'],
) => {
  useEffect(() => {
    if (!handler) return;

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === pressedKey) {
        event.preventDefault();

        handler(event);
      };
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ handler ]);
};

export default useOnKeyDown;
