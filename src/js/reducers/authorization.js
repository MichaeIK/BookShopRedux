import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';



export default function auth(state = initialState.authorized, action) {
    let {type, payload} = action;

    switch(type) {
                    
        default: 
            return state;
    }
};