import { useEffect, useState, useCallback, useRef } from 'react';

export const useStateWithPromise = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const resolverRef = useRef<any | null>(null);
  useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current(state);
      resolverRef.current = null;
    }
  }, [resolverRef.current, state]);

  const handleSetState = useCallback((stateAction) => {
    setState(stateAction);
    return new Promise(resolve => {
      resolverRef.current = resolve;
    });
  }, [setState]);

  return [state, handleSetState];
};

export const useStringFilter = (initialValue) => {
  const [value, setValue] = useStateWithPromise(initialValue);

  const reset = () => {
    // this will return a promise containing the updated state
    return setValue(initialValue);
  };

  return {
    value,
    setValue,
    reset,
  };
};