import { changeState } from '../../utils';
import { transactionTypes } from '../constants';

const initialState = {
  transactions: [],
}

export default function transactionReducer(state=initialState, action){
  switch (action.type) {
    case transactionTypes.SUCCESS_GET_TRANSACTIONS:
      return changeState(state, {
        transactions: action.payload,
      });

    default:
      return state;
  }
}