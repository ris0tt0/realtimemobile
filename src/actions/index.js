import Logger from 'js-logger'
import {normalize, schema} from 'normalizr';
import { REQUEST_ERROR_ROUTES, RECIEVE_ROUTES, REQUEST_ERROR_STATIONS, RECIEVE_STATIONS, REQUEST_ERROR_TRAIN_COUNT, RECIEVE_TRAIN_COUNT, RECIEVE_RTE, REQUEST_ERROR_RTE, REQUEST_STATIONS } from './ActionTypes';

const DEV_KEY = 'MW9S-E7SL-26DU-VV8V';

export function requestErrorRoutes(error){
	return {
		type:REQUEST_ERROR_ROUTES,
		payload: error,
	}
}

export function recieveRoutes(normalizedData)
{
	return {
		type:RECIEVE_ROUTES,
		payload:normalizedData,
	}
}

export function fetchRoutes()
{
	Logger.info('fetch routes');
	return dispatch =>
	{
		return fetch(`http://api.bart.gov/api/route.aspx?cmd=routes&key=${DEV_KEY}&json=y`)
			.then( response => response.json(),error => dispatch(requestErrorRoutes(error)) )
			.then( json =>
			{
				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const routeSchema = new schema.Entity('route',undefined,{idAttribute:item => item.routeID});
				const routesSchema = new schema.Entity('routes',{route:[routeSchema]},{idAttribute:item => 'routeId'});
				const responseSchema = new schema.Entity('response',{routes:routesSchema,uri:uriSchema},{idAttribute:response => 'responseId'});

				const normalized = normalize(json.root,responseSchema);

				Logger.info(json.root);
				Logger.info(normalized);

				dispatch(recieveRoutes(normalized));
			});
	}
}

export function requestStations(){
	return {
		type:REQUEST_STATIONS,
	}
}

export function requestErrorStations(error){
	return{
		type:REQUEST_ERROR_STATIONS,
		payload:error,
	}
}

export function recieveStations(normalizedData){
	return{
		type:RECIEVE_STATIONS,
		payload:normalizedData,
	}
}

export function fetchStations()
{
	return dispatch =>
	{
		dispatch(requestStations());
		
		return fetch(`http://api.bart.gov/api/stn.aspx?cmd=stns&key=${DEV_KEY}&json=y`)
			.then( response => response.json(), error => dispatch(requestErrorStations(error)) )
			.then( json =>
			{
				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const stationSchema = new schema.Entity('station',undefined,{idAttribute: station => `${station.abbr}`});
				const stationsSchema = new schema.Entity('stations',{station:[stationSchema]},{idAttribute:station => `stationId`});
				const responseSchema = new schema.Entity('response',{stations:stationsSchema,uri:uriSchema},{idAttribute:response => 'responseId'});
				// normalize the station data.
				const normalized = normalize(json.root, responseSchema);

				Logger.info('fetchStations');
				Logger.info(json)
				Logger.info(normalized)

				dispatch(recieveStations(normalized));
			});
	}
}

export function requestErrorTrainCount(error){
	return {
		type:REQUEST_ERROR_TRAIN_COUNT,
		payload:error,
	}
}

export function recieveTrainCount(normlizedData){
	return{
		type:RECIEVE_TRAIN_COUNT,
		payload:normlizedData,
	}
}

export function fetchTrainCount()
{
	return dispatch =>
	{
		return fetch(`http://api.bart.gov/api/bsa.aspx?cmd=count&key=${DEV_KEY}&json=y`)
			.then( response => response.json(), error => dispatch(requestErrorTrainCount(error)) )
			.then( json => {
				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const responseSchema = new schema.Entity('response',{uri:uriSchema},{idAttribute:train => `responseId`});
				const data = normalize(json.root,responseSchema);

				dispatch(recieveTrainCount(data));
			} );
	}
}

export function requestErrorRTE(error)
{
	return {
		type:REQUEST_ERROR_RTE,
		payload:error,
	}
}

export function recieveRTE(normalizedData)
{
	return {
		type:RECIEVE_RTE,
		payload:normalizedData,
	}
}

export function fetchRTE(station)
{
	return (dispatch) =>
	{
		return fetch(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=${DEV_KEY}&json=y`)
			.then( response => response.json(), error => dispatch(requestErrorRTE(error)) )
			.then( json => {

				const estimateSchema = new schema.Entity('estimate',undefined,{idAttribute: estimate => 
				{
					const {color,bikeflag,delay,direction,hexcolor,length,minutes,platform} = estimate;

					return `${color}-${bikeflag}-${delay}-${direction}-${hexcolor}-${length}-${minutes}-${platform}`;
				} });
				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const etdSchema = new schema.Entity('etd',{estimate:[estimateSchema]},{idAttribute: etd => etd.abbreviation})
				const stationSchema = new schema.Entity('station',{etd:[etdSchema]},{idAttribute: station => station.abbr });
				const responseSchema = new schema.Entity('response',{uri:uriSchema,station:[stationSchema]},{idAttribute:response => response.time});
				const normalized = normalize(json.root, responseSchema);

				Logger.info(json);
				Logger.info(normalized);

				dispatch(recieveRTE(normalized));
			} );
	}
}