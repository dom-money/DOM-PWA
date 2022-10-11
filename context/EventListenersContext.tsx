import { createContext, useContext } from 'react';
import useEventListeners from '../hooks/useEventListeners';

export type EventListenersContextType = ReturnType<typeof useEventListeners>;

const EventListenersContext = createContext({} as EventListenersContextType);

export default EventListenersContext;

export const useEventListenersContext = () => {
  return useContext(EventListenersContext);
};
