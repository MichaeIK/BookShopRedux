import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';

export default function history(state = initialState.history, action) {
    let {type, payload} = action;

    switch(type) {
        case types.ADD_TO_HISTORY:
            console.log('add to history', payload);
            return [...state, payload];
        default: 
            return state;
    }
};