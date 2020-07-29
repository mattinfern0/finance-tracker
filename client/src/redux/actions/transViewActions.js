import { transViewTypes } from '../constants';
import { transactionActions } from '.'

export function changeFilter(newFilter) {
  return (dispatch) => {
    dispatch({type: transViewTypes.CHANGE_FILTER, payload: newFilter});
    dispatch(transactionActions.getTransactions(newFilter))
  }
}

export function changeSortMethod(sortFunc) {
  return (dispatch) => {
    dispatch({type: transViewTypes.CHANGE_SORT_METHOD, payload: sortFunc});
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