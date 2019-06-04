import { normalize, schema } from 'normalizr';
import { RECIEVE_ELEVATOR_INFO, RECIEVE_GEOLOCATION, RECIEVE_ROUTES, RECIEVE_RTE, RECIEVE_SERVICE_ADVISORY, RECIEVE_STATIONS, RECIEVE_STATION_ACCESS, RECIEVE_STATION_DETAIL, RECIEVE_TRAIN_COUNT, RECIEVE_TRIP_PLANNING, REQUEST_ELEVATOR_INFO, REQUEST_ERROR_ELEVATOR_INFO, REQUEST_ERROR_GEOLOCATOIN, REQUEST_ERROR_ROUTES, REQUEST_ERROR_RTE, REQUEST_ERROR_STATIONS, REQUEST_ERROR_STATION_ACCESS, REQUEST_ERROR_STATION_DETAIL, REQUEST_ERROR_TRAIN_COUNT, REQUEST_ERROR_TRIP_PLANNING, REQUEST_GEOLOCATION, REQUEST_ROUTES, REQUEST_RTE, REQUEST_SERVICE_ADVISORY, REQUEST_STATIONS, REQUEST_STATION_ACCESS, REQUEST_STATION_DETAIL, REQUEST_TRIP_PLANNING, SET_CLOSEST_STATION, UPDATE_STATION_ACCESS_STATION_ID, UPDATE_STATION_DETAIL_STATIONID, UPDATE_TRIP_PLANNING_TRIPID } from './ActionTypes';

import Logger from 'js-logger';
import { getBartDateMonth, getBartDateTime } from '../Utils';

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
				const uriSchema = new schema.Entity('uri',{},{idAttribute: uri => 'uriId'});
				const routeSchema = new schema.Entity('route',{},{idAttribute:item => item.routeID});
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

export function updateStationAccessStationId(abbr){
	return {
		type:UPDATE_STATION_ACCESS_STATION_ID,
		payload:abbr,
	}
}

export function fetchStationAccess(stationAbbr){

	return (dispatch,getState) =>
	{
		const {stationsAccess} = getState();

		if(	stationsAccess.entities &&
				stationsAccess.entities.station &&
				stationsAccess.entities.station[stationAbbr])
		{
			return dispatch(updateStationDetailStationID(stationAbbr));
		}

		dispatch(requestStationAccess());

		return fetch(`https://api.bart.gov/api/stn.aspx?cmd=stnaccess&orig=${stationAbbr}&key=${api_key}&json=y`)
			.then( response => response.json(), error => dispatch(requestErrorStationDetail(error)) )
			.then( json => {
				const id = (value,parent,key) => parent.abbr;
				// just return the #cdata-section property
				const process = value => value['#cdata-section'];

				const uriSchema = new schema.Entity('uri',{},{idAttribute: uri => 'uriId'});
				const bikeStationSchema = new schema.Entity('bike_station_text',{},{idAttribute:id,processStrategy:process});
				const carShareSchema = new schema.Entity('car_share',{},{idAttribute:id,processStrategy:process});
				const destinationsSchema = new schema.Entity('destinations',{},{idAttribute:id,processStrategy:process});
				const enteringSchema = new schema.Entity('entering',{},{idAttribute:id,processStrategy:process});
				const exitingSchema = new schema.Entity('exiting',{},{idAttribute:id,processStrategy:process});
				const fillTimeSchema = new schema.Entity('fill_time',{},{idAttribute:id,processStrategy:process});
				const lockersSchema = new schema.Entity('lockers',{},{idAttribute:id,processStrategy:process});
				const parkingSchema = new schema.Entity('parking',{},{idAttribute:id,processStrategy:process});
				const transitInfoSchema = new schema.Entity('transit_info',{},{idAttribute:id,processStrategy:process});
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

		if(	stationsDetail.entities && 
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
				const processCdata = value => value['#cdata-section'];
				const processRoutes = value => value.route;
				const processPlatform = value => value.platform;

				const northRoutesSchema = new schema.Entity('north_routes',{},{idAttribute:id,processStrategy:processRoutes});
				const southRoutesSchema = new schema.Entity('south_routes',{},{idAttribute:id,processStrategy:processRoutes});

				const northPlatformsSchema = new schema.Entity('north_platforms',{},{idAttribute:id,processStrategy:processPlatform});
				const southPlatformsSchema = new schema.Entity('south_platforms',{},{idAttribute:id,processStrategy:processPlatform});
				const introSchema = new schema.Entity('intro',{},{idAttribute:id,processStrategy:processCdata});
				const crossStreetSchema = new schema.Entity('cross_street',{},{idAttribute:id,processStrategy:processCdata});
				const foodSchema = new schema.Entity('food',{},{idAttribute:id,processStrategy:processCdata});
				const shoppingSchema = new schema.Entity('shopping',{},{idAttribute:id,processStrategy:processCdata});
				const attractionSchema = new schema.Entity('attraction',{},{idAttribute:id,processStrategy:processCdata});
				const linkSchema = new schema.Entity('link',{},{idAttribute:id,processStrategy:processCdata});

				const uriSchema = new schema.Entity('uri',{},{idAttribute: uri => 'uriId'});
				const stationSchema = new schema.Entity('station',{
					north_routes:northRoutesSchema,
					south_routes:southRoutesSchema,
					north_platforms:northPlatformsSchema,
					south_platforms:southPlatformsSchema,
					intro:introSchema,
					cross_street:crossStreetSchema,
					food:foodSchema,
					shopping:shoppingSchema,
					attraction:attractionSchema,
					link:linkSchema,
				},{idAttribute:item => item.abbr});
				const stationsSchema = new schema.Entity('stations',{station:stationSchema},{idAttribute:item => `stationID`})
				const responseSchema = new schema.Entity('response',{stations:stationsSchema,uri:uriSchema},{idAttribute:response => 'responseId'});

				const normalized = normalize(json.root,responseSchema);

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
				const uriSchema = new schema.Entity('uri',{},{idAttribute: uri => 'uriId'});
				const stationSchema = new schema.Entity('station',{},{idAttribute: station => `${station.abbr}`});
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
				const uriSchema = new schema.Entity('uri',{},{idAttribute: uri => 'uriId'});
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

				const estimateSchema = new schema.Entity('estimate',{},{idAttribute: estimate => 
				{
					const {color,bikeflag,delay,direction,hexcolor,length,minutes,platform} = estimate;

					return `${color}-${bikeflag}-${delay}-${direction}-${hexcolor}-${length}-${minutes}-${platform}`;
				} });
				const uriSchema = new schema.Entity('uri',{},{idAttribute: uri => 'uriId'});
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

export function fetchTripPlanning(startingAbbr,destinationAbbr,dateby='depart',date='now')
{
	const bartDate = getBartDateMonth(date);
	const bartTime = getBartDateTime(date);

	Logger.info(`date:${bartDate} time:${bartTime}`);

	return (dispatch) =>
	{
		if(startingAbbr && startingAbbr.length > 0 && destinationAbbr && destinationAbbr.length > 0)
		{
			dispatch(requestTripPlanner());

			return fetch(`http://api.bart.gov/api/sched.aspx?cmd=${dateby}&orig=${startingAbbr}&dest=${destinationAbbr}&date=${bartDate}&time=${bartTime}&key=${api_key}&b=1&a=4&json=y`)
			.then( response => response.json() )
			.then( json => {
				const legProcess = value =>{
					return{
						order:value['@order'],
						origin:value['@origin'],
						destination:value['@destination'],
						origTimeMin:value['@origTimeMin'],
						origTimeDate:value['@origTimeDate'],
						destTimeMin:value['@destTimeMin'],
						destTimeDate:value['@destTimeDate'],
						line:value['@line'],
						bikeflag:value['@bikeflag'],
						load:value['@load'],
						trainHeadStation:value['@trainHeadStation'],
					}
				};

				const tripProcess = value =>{
					return {
						origin:value['@origin'],
						destination:value['@destination'],
						fare:value['@fare'],
						origTimeMin:value['@origTimeMin'],
						origTimeDate:value['@origTimeDate'],
						destTimeMin:value['@destTimeMin'],
						destTimeDate:value['@destTimeDate'],
						clipper:value['@clipper'],
						tripTime:value['@tripTime'],
						leg:value.leg,
						id:`${value['@origTimeMin']}-${value['@destTimeMin']}ID`
					}
				}
				// start to normalize the json response.
				const fareSchema = new schema.Entity('fare',{},{idAttribute: value => `${value['@name']}ID`});
				const faresSchema = new schema.Entity('fares',{fare:[fareSchema]},{idAttribute: value => `${value['@level']}-${value.fare.length}ID`});
				const legSchema = new schema.Entity('leg',{},{idAttribute: value => `${value['@origTimeMin']}-${value['@destTimeMin']}ID`,processStrategy:legProcess});
				const tripSchema = new schema.Entity('trip',{fares:faresSchema,leg:[legSchema]},{
					idAttribute: value => `${value['@origTimeMin']}-${value['@destTimeMin']}ID`,
					processStrategy:tripProcess});

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

export function requestServiceAdvisory()
{
	return {
		type:REQUEST_SERVICE_ADVISORY,
	}
}

export function requestErrorServiceAdvisory(error)
{
	return {
		type:REQUEST_ERROR_SERVICE_ADVISORY,
		payload:error,
	}
}

export function recieveServiceAdvisory(normalizedData)
{
	return {
		type:RECIEVE_SERVICE_ADVISORY,
		payload:normalizedData,
	}
}

export function fetchServiceAdvisory()
{
	return (dispatch) => {
		dispatch(requestServiceAdvisory());

		return fetch(`http://api.bart.gov/api/bsa.aspx?cmd=bsa&orig=all&key=${api_key}&json=y`)
		.then( response => response.json() )
		.then( json => {
			// generate id from array index.
			const id = (value,parent) => `${parent.bsa.indexOf(value)}-Id`;
			// create id that is used in basid
			const processBSA = (value,parent) => ({...value,id:`${parent.bsa.indexOf(value)}-Id`})
			const bsaid = (value,parent) => `${parent.id}`;
			// just retudn the cdata value.
			const processCdata = value => value['#cdata-section'];

			const uriSchema = new schema.Entity('uri',{},{idAttribute:() => 'urlId',processStrategy:processCdata});
			const descriptionSchema = new schema.Entity('description',{},{processStrategy:processCdata,idAttribute:bsaid});
			const smsTextSchema = new schema.Entity('sms_text',{},{processStrategy:processCdata,idAttribute:bsaid});
			const bsaSchema = new schema.Entity('bsa',{description:descriptionSchema,sms_text:smsTextSchema},{idAttribute:id,processStrategy:processBSA});
			const responseSchema = new schema.Entity('response',{uri:uriSchema,bsa:[bsaSchema]},{idAttribute:() => 'responseId'});
			const normalized = normalize(json.root, responseSchema);

			dispatch(recieveServiceAdvisory(normalized));
		});
	}
}

export function requestElevatorInfo()
{
	return {
		type:REQUEST_ELEVATOR_INFO,
	}
}

export function requestErrorElevatorInfo(error)
{
	return {
		type:REQUEST_ERROR_ELEVATOR_INFO,
		payload:error,
	}
}

export function recieveElevatorInfo(normalizedData)
{
	return {
		type:RECIEVE_ELEVATOR_INFO,
		payload:normalizedData,
	}
}

export function fetchElevatorInfo()
{
	return (dispatch) => {
		dispatch(requestElevatorInfo());

		return fetch(`http://api.bart.gov/api/bsa.aspx?cmd=elev&key=${api_key}&json=y`)
		.then( response => response.json() )
		.then( json => {
			// generate id from array index.
			const id = (value,parent) => `${parent.bsa.indexOf(value)}-Id`;
			// create id that is used in basid
			const processBSA = (value,parent) => ({...value,id:`${parent.bsa.indexOf(value)}-Id`})
			const bsaid = (value,parent) => `${parent.id}`;
			// just retudn the cdata value.
			const processCdata = value => value['#cdata-section'];

			const uriSchema = new schema.Entity('uri',{},{idAttribute:() => 'urlId',processStrategy:processCdata});
			const descriptionSchema = new schema.Entity('description',{},{processStrategy:processCdata,idAttribute:bsaid});
			const smsTextSchema = new schema.Entity('sms_text',{},{processStrategy:processCdata,idAttribute:bsaid});
			const bsaSchema = new schema.Entity('bsa',{description:descriptionSchema,sms_text:smsTextSchema},{idAttribute:id,processStrategy:processBSA});
			const responseSchema = new schema.Entity('response',{uri:uriSchema,bsa:[bsaSchema]},{idAttribute:() => 'responseId'});
			const normalized = normalize(json.root, responseSchema);

			dispatch(recieveElevatorInfo(normalized));
			}
		);
	}
}

export function requestGeolocation()
{
	return {
		type:REQUEST_GEOLOCATION,
	}
}

export function requestGeolocatoin(error)
{
	return {
		type:REQUEST_ERROR_GEOLOCATOIN,
		payload:error,
	}
}

export function recieveGeoLocation(position)
{
	return {
		type:RECIEVE_GEOLOCATION,
		payload:position,
	}
}

export function fetchGeolocation()
{
	return dispatch =>{
		dispatch(requestGeolocation());

		navigator.geolocation.getCurrentPosition(
			position => dispatch(recieveGeoLocation(position)),
			error => dispatch(requestGeolocatoin(error)),
		);
	}
}

export function setClosesStatoin(station)
{
	return {
		type:SET_CLOSEST_STATION,
		payload:station,
	}
}