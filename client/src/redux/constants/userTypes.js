/* For the ATTEMPT types, payload will be in format
{err, data}, with err set if failed (like in Node.js middleware)
*/
const userTypes = {
  ATTEMPT_LOGIN: 'USER_ATTEMPT_LOGIN',
  SUCCESS_LOGIN: 'USER_SUCCESS_LOGIN',
  ATTEMPT_SIGNUP: 'USER_ATTEMPT_SIGNUP',

  LOGOUT: 'USER_LOGOUT'
}

export default userTypes;