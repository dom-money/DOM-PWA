import React from 'react';
import { ethers } from 'ethers';
import useEventListeners from '../hooks/useEventListeners';
import EventListenersContext from './EventListenersContext';

interface EventListenersProviderProps {
  children: React.ReactNode;
  ethersProvider: ethers.providers.Web3Provider | null;
};

const EventListenersProvider = ({
  children,
  ethersProvider,
}: EventListenersProviderProps) => {
  const { ...eventListenersArgs } = useEventListeners(ethersProvider);

  return (
    <EventListenersContext.Provider value={{ ...eventListenersArgs }}>
      {children}
    </EventListenersContext.Provider>
  );
};

export default EventListenersProvider;
