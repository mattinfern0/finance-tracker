import { transactionTypes } from '../constants';
import { apiClient } from '../../api';
import { makeRequest } from '../../utils';

export function getTransactions(){
  return (dispatch) => {
    return makeRequest(apiClient.getTransactions)
      .then((result) => {
        if (result.err){
          dispatch({type: transactionTypes.ERROR_GET_TRANSACTIONS, payload: result.err});
          alert('Something went wrong while getting transactions');
        } else {
          dispatch({type: transactionTypes.SUCCESS_GET_TRANSACTIONS, payload: result.data});
        }
      });
  }
}

