import { useState } from "react";

type StoredValue<T> = T | null;

/**
 * Custom hook that manages state synchronization with Local Storage.
 * Retrieves the initial value from the Local Storage if present,
 * otherwise uses the provided initialValue.
 *
 * @template T - The type of the state value.
 * @param {string} key - The key used to store the state value in local storage.
 * @param {T} initialValue - The initial value of the state.
 * @returns {[StoredValue<T>, (value: T | ((prevState: StoredValue<T>) => T)) => void]} - An array containing the stored value and a function to update the state.
 */
const useLocalState = <T>(
  key: string,
  initialValue: T,
): [StoredValue<T>, (value: T | ((prevState: StoredValue<T>) => T)) => void] => {
  // Get initial value from localStorage or use initialValue if not present
  const [storedValue, setStoredValue] = useState<StoredValue<T>>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const updateState = (value: T | ((prevState: StoredValue<T>) => T)) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, updateState];
};
export default useLocalState;
