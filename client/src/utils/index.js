export function changeState(currentState, changes) {
  return Object.assign({}, currentState, changes);
}

// From django CSRF docs
export function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}

export async function makeRequest(requestFunc, requestArgs) {
  let payload = { err: null, data: null };
  try {
    const data = await requestFunc(requestArgs);
    payload.data = data.data
  } catch (error) {
    console.log(error);
    payload.err = error;
  }
  return payload;
}