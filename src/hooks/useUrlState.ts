import { useState } from "react";

type StoredValue<T> = T | null;

/**
 * Custom hook that manages state synchronization with URL parameters.
 * Retrieves the initial value from the URL if present,
 * otherwise uses the provided initialValue.
 *
 * @template T - The type of the state value.
 * @param {string} key - The key used to store the state value in the URL.
 * @param {T} initialValue - The initial value of the state.
 * @returns {[StoredValue<T>, (value: T | ((prevState: StoredValue<T>) => T)) => void]} - A tuple containing the current state value and a function to update the state.
 */
const useUrlState = <T>(
  key: string,
  initialValue: T,
): [StoredValue<T>, (value: T | ((prevState: StoredValue<T>) => T)) => void] => {
  // get initial value from url or use initialValue if not present
  const [state, setState] = useState<StoredValue<T>>(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const item = searchParams.get(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const updateState = (value: T | ((prevState: StoredValue<T>) => T)) => {
    try {
      const newValue = value instanceof Function ? value(state) : value;
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, JSON.stringify(newValue));
      setState(newValue);
      const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?" +
        searchParams.toString();
      window.history.replaceState({ path: newurl }, "", newurl);
    } catch (error) {
      console.error(error);
    }
  };

  return [state, updateState] as const;
};

export default useUrlState;
