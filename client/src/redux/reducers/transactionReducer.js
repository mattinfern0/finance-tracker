import { changeState } from '../../utils';
import { transactionTypes } from '../constants';
import moment from 'moment';

const initialState = {
  transactions: [],
  visibleFilter: null, // a filter function
  sortMethod: null
}

function formatTransaction(transaction) {
  const transCopy = JSON.parse(JSON.stringify(transaction));
  transCopy.amount = parseFloat(transCopy.amount);
  transCopy.date = moment(transCopy.date, 'YYYY-MM_DD');
  return transCopy;;
}

export default function transactionReducer(state=initialState, action){
  switch (action.type) {
    case transactionTypes.SUCCESS_GET_TRANSACTIONS:
      // Store the dates as moment() objects to make sorting/formatting them easier
      // Also convert amounts from string to floats
      const formatted = action.payload.map((t) => {
        return formatTransaction(t);
      })
      return changeState(state, {
        transactions: formatted,
      });

    case transactionTypes.SUCCESS_CREATE_TRANSATCION:
      const newTrans = formatTransaction(action.payload);
      return changeState(state, {
        transactions: state.transactions.concat([newTrans]),
      });

    default:
      return state;
  }
}