import * as types from '../constants/actionTypes';

// Actions here

export const addCategoriesToBookArray = (payload) => ({type: types.ADD_CATEGORIES_TO_BOOK_ARRAY, payload});
export const fetchBooks = (payload, category) => ({type: types.FETCH_BOOKS, payload, category});
export const filter = (payload) => ({type: types.FILTER, payload});
export const sort = (payload) => ({type: types.SORT, payload});

export const checkUsers = (payload) => ({type: types.CHECK_USERS, payload});
export const addUser = (payload) => ({type: types.ADD_USER, payload});

export const addToHistory = (payload) => ({type: types.ADD_TO_HISTORY, payload});
export const addToCart = (payload) => ({type: types.ADD_TO_CART, payload});
export const addToWishlist = (payload) => ({type: types.ADD_TO_WISHLIST, payload});


export const authorized = (payload) => ({type: types.AUTHORIZED, payload});

