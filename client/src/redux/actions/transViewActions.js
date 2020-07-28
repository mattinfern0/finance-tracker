import { transViewTypes } from '../constants';

export function changeSortMethod(sortFunc) {
  return (dispatch) => {
    dispatch({type: transViewTypes.CHANGE_SORT_METHOD, payload: sortFunc});
  }
}

export function changeFilter(filter) {
  return (dispatch) => {
    
  }
}

export function editingOn() {
  return (dispatch) => {
    dispatch({type: transViewTypes.EDITING_ON});
  }
}

export function editingOff() {
  return (dispatch) => {
    dispatch({type: transViewTypes.EDITING_OFF});
  }
}