import { createContext, useContext } from 'react';
import RootStore from './RootStore';

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = StoreContext.Provider;

export function useStore(): RootStore {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return store;
}

// Create a singleton instance of the root store
const rootStore = new RootStore();

export { rootStore };