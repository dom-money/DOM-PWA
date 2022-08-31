import { createContext } from 'react';
import useEventListeners from '../hooks/useEventListeners';

export type EventListenersContextType = ReturnType<typeof useEventListeners>;

const EventListenersContext =
  createContext<EventListenersContextType | null>(null);

export default EventListenersContext;
