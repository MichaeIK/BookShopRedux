import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';
/*
*
* Это reducer, он обрабатывает наши actions. Можно создать несколько редьюсеров для разных
* по смыслу событий.
*
* Reducer это функция (всегда), которая принимает на вход два параметра,
*
* первый - state, это или кусочек данных из всего приложения который мы можем с помощью
* этого редьюсера изменять.
*
* второй - action, это событие которое мы вызвали. Событием в redux служит объект, который по
* договоренности должен содержать в себе тип события, и определенные данные которые
* опять же по договоренности называются payload, этим payload может быть что угодно.
*
* Есть еще одно правило - функция reducer должна являться чистой функцией.
*
* Чистая функция — это функция, которая при одинаковых аргументах всегда
* возвращает одни и те же значения и не имеет видимых побочных эффектов.
*
*/
export default function users(state = { users: initialState.users, 
                            authorized: initialState.authorized }, action) {
    let { type, payload } = action;
    let userName = '';
    switch (type) {
        case types.CHECK_USERS:
            {
                [...state, state.users.map((person, i) => {
                    if (payload.name == person.name && payload.password == person.password) {
                        console.log('Welcome', payload.name);
                        userName = person.name;
                    }
                })]
            }
            if (userName != '') {
                return { ...state, authorized: userName }
            }
            return state;

        case types.ADD_USER:
            let isExist = state.users.findIndex(person => (person.name == payload.name || person.email == payload.email));
            if (isExist == -1) {
                return { users: [...state.users, payload], authorized: payload.name };
            } else {
                return state;
            }

        case types.ADD_TO_HISTORY:
            return { users: state.users.map((item,index)=> { 
                if( item.name == state.authorized) {
                    let viewList = item.viewHistory.findIndex(x => (x.id == payload.id))
                    if (viewList == -1) {
                        return {...item,  viewHistory: [...item.viewHistory, payload] }
                    } else {
                        return item;
                    }
                }
                else return item
            }), authorized: state.authorized }

        case types.ADD_TO_CART:
            return { users: state.users.map((item,index)=> {
                if( item.name == state.authorized) {
                    let viewList = item.cart.findIndex(x => (x.id == payload.id))
                    if (viewList == -1) {                   
                        return {...item,  cart: [...item.cart, payload] }
                    } else {
                        return item;
                    }
                }
                else return item
            }), authorized: state.authorized }

        case types.ADD_TO_WISHLIST:
            return { users: state.users.map((item,index)=> { 
                if( item.name == state.authorized) {   
                    let viewList = item.wishList.findIndex(x => (x.id == payload.id)) 
                    if (viewList == -1) { 
                        return {...item,  wishList: [...item.wishList, payload] }
                    } else {
                        return item;
                    }
                }
                else return item
            }), authorized: state.authorized }

            

        default:
            return state;
    }
};