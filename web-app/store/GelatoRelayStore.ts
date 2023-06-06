import { create } from 'zustand';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import { GELATO_RELAY_API_KEY } from '@/constants';

type State = {
  relayAdapter: GelatoRelayPack;
};

export const useGelatoRelayStore = create<State>()(() => ({
  relayAdapter: new GelatoRelayPack(GELATO_RELAY_API_KEY),
}));

export const useRelayAdapter = () =>
  useGelatoRelayStore((state) => state.relayAdapter);
