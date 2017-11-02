import * as types from '../constants/actionTypes';

// Actions here

export const fetchBooks = (payload) => ({type: types.FETCH_BOOKS, payload});
export const filter = (payload) => ({type: types.FILTER, payload});
export const sort = (payload) => ({type: types.SORT, payload});
export const addToHistory = (payload) => ({type: types.ADD_TO_HISTORY, payload});
export const checkUsers = (payload) => ({type: types.CHECK_USERS, payload});
export const addUser = (payload) => ({type: types.ADD_USER, payload});

