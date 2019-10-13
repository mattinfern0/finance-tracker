import  { errorTypes } from '../constants';

export function clearErrors() {
  return (dispatch) => {
    dispatch({type: errorTypes.CLEAR_ERRORS})
  }
}