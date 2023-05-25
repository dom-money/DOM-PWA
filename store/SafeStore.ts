import { create } from 'zustand';
import SafeApiKit from '@safe-global/api-kit';
import Safe from '@safe-global/protocol-kit';

type State = {
  safeService: SafeApiKit | null;
  safe: Safe | null;
  safeAddress: string | null;
};

type Actions = {
  actions: {
    setSafeService: (safeService: State['safeService']) => void;
    setSafe: (safe: State['safe']) => void;
    setSafeAddress: (safeAddress: State['safeAddress']) => void;
  };
};

export const useSafeStore = create<State & Actions>()((set) => ({
  safeService: null,
  safe: null,
  safeAddress: null,
  actions: {
    setSafeService: (safeService) => set(() => ({ safeService })),
    setSafe: (safe) => set(() => ({ safe })),
    setSafeAddress: (safeAddress) => set(() => ({ safeAddress })),
  },
}));

export const useSafeActions = () => useSafeStore((state) => state.actions);
