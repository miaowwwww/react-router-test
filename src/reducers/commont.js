// import { myPageOptionsActions } from '../actions/myPageOptionsAction';

const initialState = {
	showLogin: false,
	logining: false
}

const commont = (state = initialState, action) => {
	switch(action.type) {
		case 'toggleLoginView':
			return {
				...state,
				showLogin: !state.showLogin	
			};
		case 'beginLogin': 
			return {
				...state,
				logining: true
			};
		case 'finishLogin':
			return {
				...state,
				logining: false,
				showLogin: false
			}
		default: 
			return state;
	}
}

export default commont;