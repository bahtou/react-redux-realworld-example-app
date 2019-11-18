import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../actions/actionTypes';


const initialState = {
  tags: []
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload.tags
      };
    case HOME_PAGE_UNLOADED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};


export default reducer;
