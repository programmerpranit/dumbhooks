/**
 * Custom hook that manages state synchronization with Seession Storage.
 * Retrieves the initial value from the Session Storage if present,
 * otherwise uses the provided initialValue.
 *
 * @template T - The type of the value stored in session storage.
 * @param {string} key - The key used to store the value in session storage.
 * @param {T} initialValue - The initial value to be used if no value is found in session storage.
 * @returns {[StoredValue<T>, (value: T | ((prevState: StoredValue<T>) => T)) => void]} - A tuple containing the stored value and a function to update the value.
 */
import { useState } from "react";

type StoredValue<T> = T | null;

const useSessionStorage = <T>(
  key: string,
  initialValue: T,
): [StoredValue<T>, (value: T | ((prevState: StoredValue<T>) => T)) => void] => {
  // Get initial value from sessionStorage or use initialValue if not present
  const [storedValue, setStoredValue] = useState<StoredValue<T>>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
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
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, updateState];
};

export default useSessionStorage;
