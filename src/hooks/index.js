import { useEffect, useReducer, useState } from 'react';


function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const initState = {
  response: null,
  error: null,
  isLoading: false
};
function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
}

function useFetchReducer(...args) {
  const [state, dispatch] = useReducer(fetchReducer, initState);
  const { response, error, isLoading } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const res = await Promise.all(args);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: res
        });
      } catch (error) {
        console.log('fetch error', error);
        dispatch({ type: 'FETCH_FAILURE'});
      }
    };

    fetchData();
  }, []);

  return { response, error, isLoading };
};

function useFetch(...args) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Promise.all(args);
        setResponse(res);
        setIsLoading(false);
      } catch (error) {
        console.log('fetch error', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { response, error, isLoading };
};


export {
  useFetch,
  useLocalStorage,
  useFetchReducer
};
