import React, { createContext, useContext, useReducer } from 'react';
import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  UPDATE_FIELD_USER,
} from '../constants/actionTypes';


const UserStateContext = createContext();
const UserDispatchContext = createContext();

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
    case UPDATE_FIELD_USER:
      return {
        ...state,
        [action.key]: action.value
      };
    default:
      return state;
  }
};

function UserProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  return useContext(UserStateContext);
}

function useUserDispatch() {
  return useContext(UserDispatchContext);
}


export {
  UserProvider,
  useUserState,
  useUserDispatch
};
