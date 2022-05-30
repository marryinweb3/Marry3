import { useMemo } from "react";
import { IStore, StoreType } from "./store.interface";

interface StoreConstructor<T> {
  new (): T;
  type: StoreType;
}

const stores: Record<string, IStore> = {};

export default function useStore<T extends IStore>(store: StoreConstructor<T>) {
  const storeInstance = stores[store.type];
  if (storeInstance) {
    return storeInstance as T;
  } else {
    const newStore = new store();
    stores[store.type] = newStore;
    return newStore as T;
  }
}
