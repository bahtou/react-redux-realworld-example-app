import React, { createContext, useContext, useReducer } from 'react';
import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  UPDATE_FIELD_AUTH,
} from '../constants/actionTypes';


const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
  username: '',
  email: '',
  password: '',
  inProgress: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {
        ...initialState
      };
    case UPDATE_FIELD_AUTH:
      return {
        ...state,
        [action.key]: action.value
      };
    default:
      return state;
  }
};

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  return useContext(AuthStateContext);
}

function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}


export {
  AuthProvider,
  useAuthState,
  useAuthDispatch
};
