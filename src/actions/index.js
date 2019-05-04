import Logger from 'js-logger'
import {normalize, schema} from 'normalizr';
import {
	REQUEST_ERROR_ROUTES,
	RECIEVE_ROUTES,
	REQUEST_ERROR_STATIONS,
	RECIEVE_STATIONS,
	REQUEST_ERROR_TRAIN_COUNT,
	RECIEVE_TRAIN_COUNT,
	RECIEVE_RTE,
	REQUEST_ERROR_RTE,
	REQUEST_STATIONS,
	REQUEST_RTE,
	REQUEST_STATION_DETAIL,
	REQUEST_ERROR_STATION_DETAIL,
	RECIEVE_STATION_DETAIL,
	UPDATE_STATION_DETAIL_STATIONID,
	REQUEST_ROUTES,
	REQUEST_TRIP_PLANNING,
	REQUEST_ERROR_TRIP_PLANNING,
	RECIEVE_TRIP_PLANNING,
	UPDATE_TRIP_PLANNING_TRIPID,
	REQUEST_STATION_ACCESS,
	REQUEST_ERROR_STATION_ACCESS,
	RECIEVE_STATION_ACCESS } from './ActionTypes';

const api_key = 'MW9S-E7SL-26DU-VV8V';

export function requestRoutes(){
	return {
		type:REQUEST_ROUTES,
	}
}

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
	return (dispatch,getState) =>
	{
		const {routes:{entities}} = getState();

		if(entities)
		{
			// just use once per session
			return Promise.resolve();
		}
		
		dispatch(requestRoutes());

		return fetch(`http://api.bart.gov/api/route.aspx?cmd=routes&key=${api_key}&json=y`)
			.then( response => response.json(),error => dispatch(requestErrorRoutes(error)) )
			.then( json =>
			{
				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const routeSchema = new schema.Entity('route',undefined,{idAttribute:item => item.routeID});
				const routesSchema = new schema.Entity('routes',{route:[routeSchema]},{idAttribute:item => 'routeId'});
				const responseSchema = new schema.Entity('response',{routes:routesSchema,uri:uriSchema},{idAttribute:response => 'responseId'});

				const normalized = normalize(json.root,responseSchema);

				dispatch(recieveRoutes(normalized));
			});
	}
}

export function requestStationAccess(){
	return {
		type:REQUEST_STATION_ACCESS,
	}
}

export function requestErrorStationAccess(error){
	return {
		type:REQUEST_ERROR_STATION_ACCESS,
		payload:error,
	}
}

export function recieveStationAccess(normalizedData){
	return {
		type:RECIEVE_STATION_ACCESS,
		payload:normalizedData,
	}
}

export function fetchStationAccess(stationAbbr){

	return (dispatch) =>
	{
		dispatch(requestStationAccess());

		return fetch(`https://api.bart.gov/api/stn.aspx?cmd=stnaccess&orig=${stationAbbr}&key=${api_key}&json=y`)
			.then( response => response.json(), error => dispatch(requestErrorStationDetail(error)) )
			.then( json => {
				const id = (value,parent,key) => parent.abbr;

				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const bikeStationSchema = new schema.Entity('bike_station_text',undefined,{idAttribute:id});
				const carShareSchema = new schema.Entity('car_share',undefined,{idAttribute:id});
				const destinationsSchema = new schema.Entity('destinations',undefined,{idAttribute:id});
				const enteringSchema = new schema.Entity('entering',undefined,{idAttribute:id});
				const exitingSchema = new schema.Entity('exiting',undefined,{idAttribute:id});
				const fillTimeSchema = new schema.Entity('fill_time',undefined,{idAttribute:id});
				const lockersSchema = new schema.Entity('lockers',undefined,{idAttribute:id});
				const parkingSchema = new schema.Entity('parking',undefined,{idAttribute:id});
				const transitInfoSchema = new schema.Entity('transit_info',undefined,{idAttribute:id});
				const stationSchema = new schema.Entity('station',{
					bike_station_text:bikeStationSchema,
					car_share:carShareSchema,
					destinations:destinationsSchema,
					entering:enteringSchema,
					exiting:exitingSchema,
					fill_time:fillTimeSchema,
					lockers:lockersSchema,
					parking:parkingSchema,
					transit_info:transitInfoSchema,
					},{idAttribute:item => item.abbr});
				const stationsSchema = new schema.Entity('stations',{station:stationSchema},{idAttribute:item => `stationID`});
				const responseSchema = new schema.Entity('response',{stations:stationsSchema,uri:uriSchema},{idAttribute:response => 'responseId'});

				const normalized = normalize(json.root,responseSchema);

				dispatch(recieveStationAccess(normalized));
			});
	}
}

export function requestStationDetail(){
	return {
		type:REQUEST_STATION_DETAIL,
	}
}
export function requestErrorStationDetail(error){
	return{
		type:REQUEST_ERROR_STATION_DETAIL,
		payload:error
	}
}
export function recieveStationDetail(normalizedData){
	return{
		type:RECIEVE_STATION_DETAIL,
		payload:normalizedData,
	}
}

export function updateStationDetailStationID(abbr){
	return{
		type:UPDATE_STATION_DETAIL_STATIONID,
		payload:abbr,
	}
}

export function fetchStationDetail(stationAbbr){

	return (dispatch,getState) =>
	{

		const {stationsDetail} = getState();

		if( stationsDetail.entities && 
				stationsDetail.entities.station &&
				stationsDetail.entities.station[stationAbbr])
		{
			return dispatch(updateStationDetailStationID(stationAbbr));
		}

		dispatch(requestStationDetail());

		return fetch(`https://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${stationAbbr}&key=${api_key}&json=y`)
			.then( response => response.json(), error => dispatch(requestErrorStationDetail(error)) )
			.then( json => {

				const id = (value,parent,key) => parent.abbr;

				const northRoutesSchema = new schema.Entity('north_routes',{},{idAttribute:id});
				const southRoutesSchema = new schema.Entity('south_routes',{},{idAttribute:id});

				const northPlatformsSchema = new schema.Entity('north_platforms',{},{idAttribute:id});
				const southPlatformsSchema = new schema.Entity('south_platforms',{},{idAttribute:id});

				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const stationSchema = new schema.Entity('station',{
					north_routes:northRoutesSchema,
					south_routes:southRoutesSchema,
					north_platforms:northPlatformsSchema,
					south_platforms:southPlatformsSchema,
				},{idAttribute:item => item.abbr});
				const stationsSchema = new schema.Entity('stations',{station:stationSchema},{idAttribute:item => `stationID`})
				const responseSchema = new schema.Entity('response',{stations:stationsSchema,uri:uriSchema},{idAttribute:response => 'responseId'});

				const normalized = normalize(json.root,responseSchema);

				Logger.info(json.root);

				dispatch(recieveStationDetail(normalized));
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
		
		return fetch(`http://api.bart.gov/api/stn.aspx?cmd=stns&key=${api_key}&json=y`)
			.then( response => response.json(), error => dispatch(requestErrorStations(error)) )
			.then( json =>
			{
				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const stationSchema = new schema.Entity('station',undefined,{idAttribute: station => `${station.abbr}`});
				const stationsSchema = new schema.Entity('stations',{station:[stationSchema]},{idAttribute:station => `stationId`});
				const responseSchema = new schema.Entity('response',{stations:stationsSchema,uri:uriSchema},{idAttribute:response => 'responseId'});
				// normalize the station data.
				const normalized = normalize(json.root, responseSchema);

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
		return fetch(`http://api.bart.gov/api/bsa.aspx?cmd=count&key=${api_key}&json=y`)
			.then( response => response.json(), error => dispatch(requestErrorTrainCount(error)) )
			.then( json => {
				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const responseSchema = new schema.Entity('response',{uri:uriSchema},{idAttribute:train => `responseId`});
				const data = normalize(json.root,responseSchema);

				dispatch(recieveTrainCount(data));
			} );
	}
}

export function requestRTE()
{
	return {type:REQUEST_RTE};
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
		dispatch(requestRTE());
		
		return fetch(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=${api_key}&json=y`)
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

				dispatch(recieveRTE(normalized));
			});
	}
}

export function requestTripPlanner()
{
	return {type:REQUEST_TRIP_PLANNING}
}

export function requestErrorTripPlanner(error){
	return {
		type:REQUEST_ERROR_TRIP_PLANNING,
		payload:error,
	}
}
export function recieveTripPlanner(normalizedData){
	return {
		type:RECIEVE_TRIP_PLANNING,
		payload:normalizedData,
	}
}

export function fetchTripPlanning(startingAbbr,destinationAbbr)
{
	return (dispatch) =>
	{
		if(startingAbbr && startingAbbr.length > 0 && destinationAbbr && destinationAbbr.length > 0)
		{
			dispatch(requestTripPlanner());

			return fetch(`http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${startingAbbr}&dest=${destinationAbbr}&date=today&time=now&key=${api_key}&b=1&a=4&json=y`)
			.then( response => response.json() )
			.then( json => {

				// start to normalize the json response.
				const fareSchema = new schema.Entity('fare',undefined,{idAttribute: value => `${value['@name']}ID`});
				const faresSchema = new schema.Entity('fares',{fare:[fareSchema]},{idAttribute: value => `${value['@level']}-${value.fare.length}ID`});
				const legSchema = new schema.Entity('leg',undefined,{idAttribute: value => `${value['@origTimeMin']}-${value['@destTimeMin']}ID`});
				const tripSchema = new schema.Entity('trip',{fares:faresSchema,leg:[legSchema]},{
					idAttribute: value => `${value['@origTimeMin']}-${value['@destTimeMin']}ID`,
					processStrategy: value => ({...value,id:`${value['@origTimeMin']}-${value['@destTimeMin']}ID`})} );

				const requestSchema = new schema.Entity('request',{trip:[tripSchema]},{idAttribute: value => 'requestID'});
				const scheduleSchema = new schema.Entity('schedule',{request:requestSchema},{idAttribute: value => `${value.time}-${value.date}ID`});
				const responseSchema = new schema.Entity('response',{schedule:scheduleSchema},{idAttribute: value => `${value.origin}-${value.destination}ID`});

				const normalized = normalize(json.root, responseSchema);

				dispatch(recieveTripPlanner(normalized));
			});
		}
		else
		{
			return Promise.resolve();
		}
	}
}

export function setTripPLanningTripId(id)
{
	return {
		type:UPDATE_TRIP_PLANNING_TRIPID,
		payload:id,
	}
}