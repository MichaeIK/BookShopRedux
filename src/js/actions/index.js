import * as types from '../constants/actionTypes';

// Actions here

export const fetchBooks = (payload) => ({type: types.FETCH_BOOKS, payload});
export const filter = (payload) => ({type: types.FILTER, payload});
export const sort = (payload) => ({type: types.SORT, payload});

