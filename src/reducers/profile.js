import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../constants/actionTypes';


const initialState = {
  bio: '',
  following: false,
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  username: ''
};

const reducer = (state=initialState, action) => {
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


export default reducer;
