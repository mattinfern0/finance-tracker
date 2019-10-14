import store from '../redux/store'; // Need the dispatch method from here
import { userActions } from '../redux/actions'
import { getCookie } from '../utils';


const BACKEND_URL = 'http://localhost:8000' // Change to process.env later

async function processResponse(res) {
  const data = await res.json();
  console.log('Response: ', res);
  console.log('Data: ', data);
  if (!res.ok) {
    if (res.status === 401) {
      // Logout if unauthorized
      userActions.logout()(store.dispatch);
    }
    const errorObject = { 
      status: res.status,
      message: data.message,
    };

    throw errorObject;
  }

  return {res, data};

}

export async function login(credentials) {
  const url = `${BACKEND_URL}/login/`;
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
  const url = `${BACKEND_URL}/users/`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  return await processResponse(res);
}

export async function logout() {
  const url = `${BACKEND_URL}/logout/`;
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  return await processResponse(res);
}

export async function getTransactions() {
  const url = `${BACKEND_URL}/transactions/`;
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
