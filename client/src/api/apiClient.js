import store from '../redux/store'; // Need the dispatch method from here
import { userActions } from '../redux/actions'
import { getCookie } from '../utils';


const BACKEND_URL = 'http://localhost:8000' // Change to process.env later

async function parseBody(res) {
  const text = await res.text();
  let data = null;

  // Check if body is not empty before parsing
  if (text && text.length > 0) {
    data = JSON.parse(text);
  }
  return data;
}

async function processResponse(res) {
  console.log('Response: ', res);
  const data = await parseBody(res);
  console.log('Data: ', data);
  if (!res.ok) {
    if (res.status === 401) {
      // Logout if unauthorized
      userActions.logout()(store.dispatch);
    }
    const message = (data.message ? data.message : null)
    const errorObject = { 
      status: res.status,
      message,
    };
    throw errorObject;
  }

  return {res, data};

}

export async function login(credentials) {
  const url = `${BACKEND_URL}/login`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  console.log('Made request');

  return await processResponse(res);
}

export async function signup(credentials) {
  const url = `${BACKEND_URL}/users`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  return await processResponse(res);
}

export async function logout() {
  const url = `${BACKEND_URL}/logout`;
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  return await processResponse(res);
}

export async function getTransactions(filter={}) {
  let params = new URLSearchParams();
  for (let key in filter) {
    params.append(key, filter[key]);
  }

  const url = `${BACKEND_URL}/transactions/?${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  return await processResponse(res);
}

export async function createTransaction(newTransaction) {
  const url = `${BACKEND_URL}/transactions/`;
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: JSON.stringify(newTransaction),
  });

  return await processResponse(res);
}

export async function deleteTransaction(transactionId) {
  const url = `${BACKEND_URL}/transactions/${transactionId}/`;
  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
    },
  });

  return await processResponse(res);
}

export async function editTransaction(editedTransaction) {
  const url = `${BACKEND_URL}/transactions/${editedTransaction.id}/`;
  const res = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: JSON.stringify(editedTransaction),
  });

  return await processResponse(res);
}
