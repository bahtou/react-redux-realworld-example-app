import {
  APPLY_TAG_FILTER,
  CHANGE_TAB
} from './actionTypes';


export function changeTab(tab, pager, payload) {
  return {
    type: CHANGE_TAB,
    tab,
    pager,
    payload
  };
}

export function clickTag(tag, pager, payload) {
  return {
    type: APPLY_TAG_FILTER,
    tag,
    pager,
    payload
  };
}
