import {combineReducers} from 'redux';
import { RECIEVE_RTE, RECIEVE_TRIP_PLANNING, RECIEVE_ROUTES, RECIEVE_STATIONS, REQUEST_ERROR_ROUTES, REQUEST_ERROR_RTE, REQUEST_ERROR_STATIONS, REQUEST_ERROR_TRAIN_COUNT, REQUEST_ERROR_TRIP_PLANNING, REQUEST_STATIONS } from '../actions/ActionTypes';

function rte(state = {},action){

	switch(action.type){
		case RECIEVE_RTE:
			return action.payload;
		default:
			return {...state};
	}
}

function tripplanner(state = {},action){

	switch(action.type)
	{
		case RECIEVE_TRIP_PLANNING:
			return action.payload;
		default:
			return {...state};
	}
}

function routes(state = {}, action){
	switch(action.type){
		case RECIEVE_ROUTES:
			return action.payload;
		default:
			return {...state};
	}
}

function stations(state={isFetching:false},action){
	switch(action.type){
		case REQUEST_STATIONS:
			return {...state,isFetching:true}
		case RECIEVE_STATIONS:
			return {...action.payload,isFetching:false};
		default:
			return {...state};
	}
}

function request_error(state = {}, action)
{
	switch(action.type)
	{
		case REQUEST_ERROR_ROUTES:
		case REQUEST_ERROR_RTE:
		case REQUEST_ERROR_STATIONS:
		case REQUEST_ERROR_TRAIN_COUNT:
		case REQUEST_ERROR_TRIP_PLANNING:
		
			Logger.debug('request error');
			Logger.info(action.payload);

			return action.payload;
		default:
			return {...state};
	}
}

const reducers = combineReducers({
	rte,
	tripplanner,
	routes,
	stations,

	request_error,
});

export default reducers;