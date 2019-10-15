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

function deleteById(transactionList, targetId) {
  let targetIndex = null;
  for (let i = 0; i < transactionList.length; i++) {
    if (transactionList[i].id === targetId) {
      targetIndex = i;
      break;
    }
  }

  if (targetIndex !== null) {
    // Remove by filterting to preserve immmutability
    return transactionList.filter((val, index) => {
      return index !== targetIndex;
    })
  } else {
    return transactionList;
  }
}

function editById(transactionList, targetId, newTransaction) {
  let targetIndex = null;
  for (let i = 0; i < transactionList.length; i++) {
    if (transactionList[i].id === targetId) {
      targetIndex = i;
      break;
    }
  }

  if (targetIndex === null) {
    return transactionList;
  }

  const listCopy = [...transactionList];
  listCopy[targetIndex] = newTransaction;
  return listCopy;
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

    case transactionTypes.SUCCESS_DELETE_TRANSACTION:
      return changeState(state, {
        transactions: deleteById(state.transactions, action.payload),
      });

    case transactionTypes.SUCCESS_EDIT_TRANSACTION:
      const targetId = action.payload.id;
      const editedTransaction = formatTransaction(action.payload);
      return changeState(state, {
        transactions: editById(state.transactions, targetId, editedTransaction),
      })

    default:
      return state;
  }
}