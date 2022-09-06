import React from 'react';
import useEventListeners from '../hooks/useEventListeners';
import EventListenersContext from './EventListenersContext';

interface EventListenersProviderProps {
  children: React.ReactNode;
};

const EventListenersProvider = ({ children }: EventListenersProviderProps) => {
  const { ...eventListenersArgs } = useEventListeners();

  return (
    <EventListenersContext.Provider value={{ ...eventListenersArgs }}>
      {children}
    </EventListenersContext.Provider>
  );
};

export default EventListenersProvider;
