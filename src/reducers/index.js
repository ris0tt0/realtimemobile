import {combineReducers} from 'redux';

function tempState(state = '',action)
{
	switch(action.type)
	{
		case 'none':
			return '';
		default:
			return state;
	}
}

const reducers = combineReducers({
	tempState,
});

export default reducers;