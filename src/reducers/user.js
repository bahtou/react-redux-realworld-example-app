import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  UPDATE_FIELD_USER,
} from '../constants/actionTypes';


const initialState = {
  username: '',
  email: '',
  password: '',
  inProgress: null
};

const reducer = (state=initialState, action) => {
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


export default reducer;
