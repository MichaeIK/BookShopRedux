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
const initial = JSON.parse(localStorage.getItem('books')) || initialState.books;
console.log("JSON.parse(localStorage.getItem('books'))", JSON.parse(localStorage.getItem('books')));
export default function data(state = initial, action) {
    console.log('state', state);
    let { type, payload, category } = action;

    switch (type) {
        case types.FETCH_BOOKS:
            let check = 0;
            state.map((item) => {
                if (Object.keys(item)[0] === category) {
                    check = 1;
                }
            })
            if (check) {
                return state.map((item, index) => {
                    // console.log("DATA REDUCER: ", item)
                    if (Object.keys(item)[0] === category) {
                        return { [Object.keys(item)[0]]: [...payload] };

                    } else return item;
                })
            } else {
                return state.map((item, index) => {
                    // console.log("DATA REDUCER: ", item)
                    if (Object.keys(item)[0] === 'temporary') {
                        return { [Object.keys(item)[0]]: [...payload] };

                    } else return item;
                })
            }

        // return [...state, ...payload];

        case types.ADD_CATEGORIES_TO_BOOK_ARRAY:
            // console.log('add', payload);
            if (JSON.parse(localStorage.getItem('books'))) {
                return state;
            } else {
                return [...payload.map((item, i) => {
                    return { [item]: [] };
                })]
            }
           

        default:
            return state;
    }
};