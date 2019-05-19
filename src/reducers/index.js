import { 
	RECIEVE_RTE,
	RECIEVE_TRIP_PLANNING,
	RECIEVE_ROUTES,
	RECIEVE_STATIONS,
	REQUEST_ERROR_ROUTES,
	REQUEST_ERROR_RTE,
	REQUEST_ERROR_STATIONS,
	REQUEST_ERROR_TRAIN_COUNT,
	REQUEST_ERROR_TRIP_PLANNING,
	REQUEST_STATIONS,
	REQUEST_ROUTES, 
	REQUEST_TRIP_PLANNING,
	REQUEST_RTE, 
	REQUEST_ERROR_STATION_DETAIL,
	REQUEST_STATION_DETAIL,
	RECIEVE_STATION_DETAIL,
	UPDATE_STATION_DETAIL_STATIONID,
	UPDATE_TRIP_PLANNING_TRIPID,
	REQUEST_STATION_ACCESS,
	RECIEVE_STATION_ACCESS,
	UPDATE_STATION_ACCESS_STATION_ID,
	REQUEST_SERVICE_ADVISORY,
	RECIEVE_SERVICE_ADVISORY,
	REQUEST_ERROR_SERVICE_ADVISORY,
	REQUEST_ELEVATOR_INFO,
	RECIEVE_ELEVATOR_INFO,
	REQUEST_ERROR_ELEVATOR_INFO,
	REQUEST_GEOLOCATION,
	REQUEST_ERROR_GEOLOCATOIN,
	RECIEVE_GEOLOCATION,
} from '../actions/ActionTypes'

import Logger from 'js-logger'
import {combineReducers} from 'redux'

function rte(state = {isFetching:false},action){

	switch(action.type){
		case REQUEST_RTE:
			return {isFetching:true};
		case RECIEVE_RTE:
			return {...action.payload, isFetching:false};
		default:
			return {...state};
	}
}

function tripplanner(state = {isFetching:false},action){

	switch(action.type)
	{
		case REQUEST_TRIP_PLANNING:
			return {...state,isFetching:true};
		case RECIEVE_TRIP_PLANNING:
			return {...action.payload,isFetching:false};
		case UPDATE_TRIP_PLANNING_TRIPID:
			return {...state,tripId:action.payload};
		default:
			return {...state};
	}
}

function routes(state = {isFetching:false}, action){
	switch(action.type){
		case REQUEST_ROUTES:
			return {...state,isFetching:true};
		case RECIEVE_ROUTES:
			return {...action.payload,isFetching:false};
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

function stationsDetail(state={isFetching:false},action){
	switch(action.type)
	{
		case REQUEST_STATION_DETAIL:
			return {...state,isFetching:true}
		case RECIEVE_STATION_DETAIL:
			const {entities} = state;
			if(entities)
			{
				for(prop in entities)
				{
					//ignore stations because we want the server response data.
					if( prop === 'stations') continue;

					action.payload.entities[prop] = {...action.payload.entities[prop], ...entities[prop]}
				}
			}

			return {...action.payload,isFetching:false};
		case UPDATE_STATION_DETAIL_STATIONID:
			state.entities.stations.stationID.station = action.payload;
		default:
			return {...state};
	}
}
function stationsAccess(state={},action){
	switch(action.type)
	{
		case REQUEST_STATION_ACCESS:
			return {...state,isFetching:true};
		case RECIEVE_STATION_ACCESS:
			// first grab the current entities.
			const {entities} = state;
			if(entities)
			{
				for(prop in entities)
				{
					//ignore stations because we want the server response data.
					if( prop === 'stations') continue;
					//merge
					action.payload.entities[prop] = {...action.payload.entities[prop], ...entities[prop]}
				}
			}

			return {...action.payload,isFetching:false};
		case UPDATE_STATION_ACCESS_STATION_ID:
			state.entities.stations.stationID.station = action.payload;
		default:
			return {...state};
	}
}

function serviceAdvisory(state ={}, action)
{
	switch(action.type)
	{
		case REQUEST_SERVICE_ADVISORY:
			return {...state,isFetching:true};
		case RECIEVE_SERVICE_ADVISORY:
			return {...action.payload,isFetching:false};
		default:
			return {...state};
	}
}

function elevatorInfo(state ={}, action)
{
	switch(action.type)
	{
		case REQUEST_ELEVATOR_INFO:
			return {...state,isFetching:true};
		case RECIEVE_ELEVATOR_INFO:
			return {...action.payload,isFetching:false};
		default:
			return {...state};
	}
}
function geolocation(state = {}, action)
{
	switch(action.type)
	{
		case REQUEST_GEOLOCATION:
			return {...state,isFetching:true};
		case RECIEVE_GEOLOCATION:
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
		case REQUEST_ERROR_STATION_DETAIL:
		case REQUEST_ERROR_ELEVATOR_INFO:
		case REQUEST_ERROR_SERVICE_ADVISORY:
		case REQUEST_ERROR_GEOLOCATOIN:
		
			Logger.debug(`Request Error: ${action.type}`);
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
	stationsDetail,
	stationsAccess,
	request_error,
	serviceAdvisory,
	elevatorInfo,
	geolocation,
});

export default reducers;