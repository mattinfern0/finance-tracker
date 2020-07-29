import { transactionTypes, transViewTypes } from '../constants';
import { transViewActions } from '.'
import { apiClient } from '../../api';
import { makeRequest } from '../../utils';

import moment from 'moment';

export function getTransactions(filter={}){
  return (dispatch) => {
    console.log(`getTransactions:`);
    console.log(filter)
    return makeRequest(apiClient.getTransactions, filter)
      .then((result) => {
        if (result.err){
          dispatch({type: transactionTypes.ERROR_GET_TRANSACTIONS, payload: result.err});
          alert('Something went wrong while getting transactions');
        } else {
          dispatch({type: transactionTypes.SUCCESS_GET_TRANSACTIONS, payload: result.data});
          // dispatch({type: transViewTypes.CHANGE_FILTER, payload: filter})
        }
      });
  }
}

export function createTransaction(newTransaction) {
  return (dispatch) => {
    return makeRequest(apiClient.createTransaction, newTransaction)
      .then((result) => {
        if (result.err) {
          alert('Error while creating your transaction');
          dispatch({type: transactionTypes.ERROR_CREATE_TRANSACTION, payload: result.err});
        } else {
          dispatch({type: transactionTypes.SUCCESS_CREATE_TRANSATCION, payload: result.data});
          console.log("Result data: ");
          console.log(result.data);

          const transDate = moment(result.data.date, "YYYY-MM-DD");

          
          let newFilter = {
            month: transDate.month() + 1,
            year: transDate.year(),
          }

          dispatch(transViewActions.changeFilter(newFilter));
          
        }
      })
  }
}

export function deleteTransaction(transactionId) {
  return (dispatch) => {
    return makeRequest(apiClient.deleteTransaction, transactionId)
      .then((result) => {
        if (result.err) {
          alert('Error while deleting this transaction');
          dispatch({type: transactionTypes.ERROR_DELETE_TRANSACTION, payload: result.err});
        } else {
          dispatch({type: transactionTypes.SUCCESS_DELETE_TRANSACTION, payload: transactionId});
        }
      });
  }
}

export function editTransaction(editedTransaction) {
  return (dispatch) => {
    return makeRequest(apiClient.editTransaction, editedTransaction)
      .then((result) => {
        if (result.err) {
          alert('Error while editing this transaction');
          dispatch({type: transactionTypes.ERROR_EDIT_TRANSACTION, payload: result.err});
        } else {
          dispatch({type: transactionTypes.SUCCESS_EDIT_TRANSACTION, payload: result.data})
        }
      })
  }
}
