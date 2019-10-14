import { transViewTypes } from '../constants';

export function changeSortMethod(sortFunc) {
  return (dispatch) => {
    dispatch({type: transViewTypes.CHANGE_SORT_METHOD, payload: sortFunc});
  }
}