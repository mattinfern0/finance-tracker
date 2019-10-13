import store from '../redux/store'; // Need the dispatch method from here
import { userActions } from '../redux/actions'


const BACKEND_URL = 'http://localhost:8000' // Change to process.env later

async function processResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      // Logout if unauthorized
      userActions.logout()(store.dispatch);
    }
    const errorObject = { 
      status: res.status,
      data
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
  const url = `${BACKEND_URL}/signup`;
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
