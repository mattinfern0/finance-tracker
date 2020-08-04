import  {notificationTypes } from '../constants';

export function setNotification(notification) {
  console.log('Dispatching setNotifiy')
  return (dispatch) => {
    dispatch({type: notificationTypes.SET_NOTIFICATION, payload: notification})
  }
}

export function clearNotification() {
  return (dispatch) => {
    dispatch({type: notificationTypes.CLEAR_NOTIFICATION})
  }
}