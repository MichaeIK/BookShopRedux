import * as types from '../constants/actionTypes';

// Actions here

export const someAction = (payload) => ({type: types.SOME_ACTION, payload});
export const filter = (payload) => ({type: types.FILTER, payload});
export const sort = (payload) => ({type: types.SORT, payload});

