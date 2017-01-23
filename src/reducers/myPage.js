// import { myPageOptionsActions } from '../actions/myPageOptionsAction';

const initialState = {
	options: ['a', 'b', 'c', 'd'],
	username: ''
}


const myPage = (state = initialState, action) => {
	switch(action.type) {
		case 'add_option':
			return {
				...state,
				options: [...state.options, action.option]
			}
		case 'finishLogin':
			return {
				...state,
				username: action.username
			}
		default: 
			return state;
	}
}

export default myPage;