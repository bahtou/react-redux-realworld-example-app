import React, { createContext, useContext, useReducer } from 'react';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../constants/actionTypes';


const ProfileStateContext = createContext();
const ProfileDispatchContext = createContext();

const initialState = {
  bio: '',
  following: false,
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  username: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        ...action.payload.profile
      };
    case PROFILE_PAGE_UNLOADED:
      return { ...initialState };
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...state,
        ...action.payload.profile
      };
    default:
      return state;
  }
};

function ProfileProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProfileStateContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  );
}

function useProfileState() {
  return useContext(ProfileStateContext);
}

function useProfileDispatch() {
  return useContext(ProfileDispatchContext);
}


export {
  ProfileProvider,
  useProfileState,
  useProfileDispatch
};
