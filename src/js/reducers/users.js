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

export default function users(state = initialState.users, action) {
    let {type, payload} = action;

    switch(type) {
        case types.CHECK_USERS:
        state.map((person, i)=>{
        	if (payload.name == person.name && payload.password == person.password){
        		console.log('Welcome', payload.name)
        	}
        })
        return state;

        case types.ADD_USER:
        let isExist = state.findIndex(person => (person.name == payload.name || person.email == payload.email));
        // let isExist = state.findIndex(person => person.name == payload.name);
        console.log('check', isExist);
        if (isExist == -1){
            return [...state, payload];
        } else {
            return state;
        }

            // state.map((person, i)=>{
            //     console.log('ok')
            //     if (person.name != payload.name){
            //         console.log('Name OK')
            //         return [...state, payload];
                        
            //     } else {
            //          console.log('Change_name')
            //          return state;
            //     }
            // })
            
            
        default: 
            return state;
    }
};