import { useState, useEffect } from "react";

/**
 * Custom hook that manages state in the URL query parameters.
 * @param name - The name of the query parameter.
 * @param defaultValue - The default value for the state if the query parameter is not present.
 * @returns A tuple containing the current state value and a function to update the state.
 */
const useUrlState = (name: string, defaultValue?: string): [string, (newState: string) => void] => {
  const [state, setState] = useState("");

  const changeState = (newState: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(name, newState);
    setState(newState);
    const newurl =
      window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParams.toString();
    window.history.replaceState({ path: newurl }, "", newurl);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlState = searchParams.get(name);

    if (urlState !== null) {
      changeState(urlState);
      setState(urlState ?? "");
    } else if (defaultValue !== undefined) {
      changeState(defaultValue);
      setState(defaultValue);
    }
  }, []);
  return [state, changeState] as const;
};

export default useUrlState;
