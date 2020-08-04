import { changeState } from '../../utils';
import { notificationTypes } from '../constants';

const initialState = {
    notification: null
}

export default function notificationReducer(state=initialState, action) {
    switch(action.type) {
        case notificationTypes.SET_NOTIFICATION:
            console.log("SET_NOTIFIACTION");
            return changeState(state, {
                notification: action.payload,
            });
        case notificationTypes.CLEAR_NOTIFICATION:
            return changeState(state, {
                notification: null
            });
        default:
            return state;
    }
}

