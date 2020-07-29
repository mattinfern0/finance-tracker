import {sortFuncs, changeState } from '../../utils';
import { transViewTypes } from '../constants';

const initialState = {
  sortFunc: sortFuncs.DEFAULT,
  editing: false,
  error: null,

  filterMonth: -1,
  filterYear: -1
}

export default function transViewReducer(state=initialState, action) {
  switch (action.type) {
    case transViewTypes.CHANGE_SORT_METHOD:
      return changeState(state, {
        sortFunc: action.payload,
      })

    case transViewTypes.EDITING_ON:
      return changeState(state, {
        editing: true
      });

    case transViewTypes.EDITING_OFF:
      return changeState(state, {
        editing: false
      })

    case transViewTypes.CHANGE_FILTER:
      let newFilter = action.payload;
      return changeState({
        filterMonth: newFilter.month,
        filterYear: newFilter.year
      });

    default:
      return state;
  }
}