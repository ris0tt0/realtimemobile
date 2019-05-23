import {createSelector} from 'reselect';
import Logger from 'js-logger';
import { getClosestCoordIndex } from '../Utils';

/**
 * Routes.
 */
const getRoutesSelector = state => state.routes;

export const routesIsFetching = createSelector([getRoutesSelector],routes =>{

	if(routes.hasOwnProperty('isFetching'))
	{
		return routes.isFetching;
	}

	return false;
});

export const routesResponse = createSelector([getRoutesSelector],routes =>{
	if( routes.entities)
	{
		return routes.entities.response[routes.result];
	}

	return {};
});

export const routesList = createSelector([getRoutesSelector,routesResponse],(routes, response) =>{
	if(routes.result)
	{
		return routes.entities.routes[response.routes].route.map( id => routes.entities.route[id]);
	}

	return [];
})

const getStationsSelector = state => state.stations;

export const stationsRespose = createSelector(getStationsSelector, stations =>{
	if( stations.entities)
	{
		return stations.entities.response[stations.result];
	}

	return {};
});

export const stationsList = createSelector([getStationsSelector,stationsRespose],(stations,response) =>{
	if(stations.entities)
	{
		return stations.entities.stations[response.stations].station.map(id => stations.entities.station[id]);
	}

	return [];
});

export const stationsIsFetching = createSelector([getStationsSelector,stationsRespose],(stations,response) => {
	if(stations.hasOwnProperty('isFetching'))
	{
		return stations.isFetching;
	}

	return false;
});

const getRealTimeEstimateSelector = state => state.rte;

export const rteResponse = createSelector(getRealTimeEstimateSelector,rte =>{
	if(rte.entities)
	{
		return rte.entities.response[rte.result];
	}

	return {};
});

export const rteIsFetching = createSelector([getRealTimeEstimateSelector,rteResponse], (rte,response) =>{
	
	if(rte.hasOwnProperty('isFetching'))
	{
		return rte.isFetching;
	}

	return false;
});

export const rteStation = createSelector([getRealTimeEstimateSelector,rteResponse],(rte,response) =>{

	if(rte.entities)
	{
		const {station} = rte.entities;
		return response.station.map(id => station[id]);
	}

	return [];
});

const rteStationsAbbr = createSelector([getRealTimeEstimateSelector,rteStation],(rte,stations) =>{
	if(rte.entities)
	{
		return stations.map(item => item.abbr);
	}

	return [];
});

export const rteStationsData = createSelector([getStationsSelector,rteStationsAbbr],(stations,abbrs) =>{
	if(stations.entities)
	{
		return abbrs.map(abbr => stations.entities.station[abbr])
	}

	return [];
})

export const rtePlatformMap = createSelector([getRealTimeEstimateSelector,rteStation],
	(rte,station) =>{
		if(rte.entities)
		{
			/** TODO: if we ETD in other than platform map, move this bit of code
			 * into its own selector function.  for new, just showing the ETD by platform
			 * in the app.
			 */
			// replace ids with data.
			const stations = station.map( stationData =>{
				if(stationData.etd) {
					return stationData.etd.map(id =>	{
						const etd = {...rte.entities.etd[id]};
						// add the estimates
						etd.estimate = etd.estimate.map(id => ({...rte.entities.estimate[id]}));
						return etd;
					});
				}

				return [];
			});
			//array of station maps.
			return stations.map(stationList =>{
				const map = new Map();
				stationList.map(station =>{
					// station.abbreviation
					// station.destination
					// station.estimate
					return station.estimate.map(etd =>{
						// etd.bickerflag
						// etd.color
						// etd.delay
						// etd.direction
						// etd.hexcolor
						// etd.length
						// etd.minutes
						// etd.platform
						if(etd.platform){
							// make sure we have a map for each platform
							if( !map.has(etd.platform)) map.set(etd.platform,new Map());
							// map with abbr key and [estimate]
							if( !map.get(etd.platform).has(station.abbreviation)) map.get(etd.platform).set(station.abbreviation,{...station,estimate:[]});
							// add the estimate data to the object
							map.get(etd.platform).get(station.abbreviation).estimate.push({...etd});
						}

						return etd;
					});
				});
				// sort by platform number
				return new Map([...map.entries()].sort());
			});
		}

		return [];
	});

export const rteLocationScreenData = createSelector(
	[getRealTimeEstimateSelector,rteResponse,rteStation,rtePlatformMap],
	(rte,response,stations,platformMap) =>{

		if( !rte.entities) return {};

		const platformSections = [];
		const {date,time,message} = response;
		const {name,abbr} = stations[0];

		platformMap.forEach(station =>{
			station.forEach((stationMap,platformName) =>{
				
				platformSections.push({
					title:`Platform:  ${platformName}`,
					data:[...stationMap.values()],
				});
			})
		});

		return {date,time,message,name,abbr,platformSections};
});

const getStationsDetailSelector = state => state.stationsDetail

export const stationsDetailIsFetching = createSelector(getStationsDetailSelector,stationsDetail =>{
		
	if(stationsDetail.hasOwnProperty('isFetching'))
	{
		return stationsDetail.isFetching;
	}

	return false;
});

export const stationsDetailStationID = createSelector(getStationsDetailSelector,stationsDetail =>{

	const {entities} = stationsDetail;

	if(entities && entities.stations && entities.stations.stationID)
	{
		return entities.stations.stationID.station;
	}

	return '';
});

export const stationsDetailStation = createSelector(
	[getStationsDetailSelector,stationsDetailStationID,getRoutesSelector],
	(stationsDetail,stationId,routes) =>{
	
	if(stationsDetail.entities && stationId.length > 0)
	{
		const {route} = routes.entities;
		const {entities} = stationsDetail;

		const station = entities.station[stationId];
		
		const north_routes = entities.north_routes && entities.north_routes[stationId] ? entities.north_routes[stationId].map(id => route[id]) : [];
		const south_routes = entities.south_routes && entities.south_routes[stationId] ? entities.south_routes[stationId].map(id => route[id]) : [];

		const north_platforms = entities.north_platforms && entities.north_platforms[stationId] ? [...entities.north_platforms[stationId]] : [];
		const south_platforms = entities.south_platforms && entities.south_platforms[stationId] ? [...entities.south_platforms[stationId]] : [];
		const intro = entities.intro[stationId];
		const cross_street = entities.cross_street[stationId];
		const food = entities.food[stationId];
		const shopping = entities.shopping[stationId];
		const attraction = entities.attraction[stationId];
		const link = entities.link[stationId];
		
		return {
			...station,
			north_routes,
			south_routes,
			north_platforms,
			south_platforms,
			intro,
			cross_street,
			food,
			shopping,
			attraction,
			link,
		};
	}

	return {};
});

export const stationsDetailStationRoutes = createSelector(
	[getRoutesSelector,getStationsDetailSelector,stationsDetailStation],
	(routes,stationsDetail,station) =>{

	if(routes.entities &&  stationsDetail.entities && station)
	{
		const {abbr} = station;
		const {route} = routes.entities;
		const {north_routes,south_routes} = stationsDetail.entities;

		// we need to null check, as some stations don't have both route
		// directions.
		const nr = north_routes && north_routes[abbr] ? north_routes[abbr] : [];
		const sr = south_routes && south_routes[abbr] ? south_routes[abbr] : [];
		// return the all the routes
		return [
			...nr.map(id => route[id]),
			...sr.map(id => route[id]),
		];
	}

	return [];
});

const getStationsAccessSelector = state => state.stationsAccess;

export const stationsAccessIsFetching = createSelector(getStationsAccessSelector,stationsAccess =>{

	if(stationsAccess.hasOwnProperty('isFetching'))
	{
		return stationsAccess.isFetching;
	}

	return false;
});

export const stationsAccessStationID = createSelector(getStationsAccessSelector,stationsAccess =>{
	const {entities} = stationsAccess;

	if(entities)
	{
		return entities.stations.stationID.station;
	}

	return '';
});

export const stationsAccessData = createSelector([getStationsAccessSelector,stationsAccessStationID],(stationsAccess,stationID) =>{

	const {entities} = stationsAccess;

	if( entities)
	{
		return {
			bikeStation:entities.bike_station_text[stationID],
			carShare:entities.car_share[stationID],
			destinations:entities.destinations[stationID],
			entering:entities.entering[stationID],
			exiting:entities.exiting[stationID],
			fillTime:entities.fill_time[stationID],
			lockers:entities.lockers[stationID],
			parking:entities.parking[stationID],
			transitInfo:entities.transit_info[stationID],
		};
	}

	return {};
});

const getTripPlannerSelector = state => state.tripplanner;

export const tripPlannerIsFetching = createSelector(getTripPlannerSelector,tripplanner =>{
		
	if(tripplanner.hasOwnProperty('isFetching'))
	{
		return tripplanner.isFetching;
	}

	return false;
});

export const tripPlannerResponse = createSelector(getTripPlannerSelector,tripplanner =>{
	if(tripplanner.entities)
	{
		return tripplanner.entities.response[tripplanner.result];
	}

	return {};
})

export const tripPlannerOriginStation = createSelector(
	[getTripPlannerSelector, getStationsSelector, tripPlannerResponse],
	(tripplanner,stations,response) =>{
	
	if(tripplanner.entities && stations.entities)
	{
		return {...stations.entities.station[response.origin]};
	}

	return {};
});

export const tripPlannerDestinationStation = createSelector(
	[getTripPlannerSelector, getStationsSelector, tripPlannerResponse],
	(tripplanner,stations,response) =>{
	
	if(tripplanner.entities && stations.entities)
	{
		return {...stations.entities.station[response.destination]};
	}

	return {};
});

export const tripPlannerSchedule = createSelector(
	[getTripPlannerSelector,tripPlannerResponse],
	(tripplaner,response) =>{

	if(tripplaner.entities)
	{
		return {...tripplaner.entities.schedule[response.schedule]};
	}

	return {};
});
function getDate(time,date)
{
	let hours = parseInt(time.substring(0,2),10);
	let minutes = parseInt(time.substring(3,5),10);
	
	const isPM = time.indexOf('PM') > -1;
	
	if(isPM)
	{
		if(hours !== 12)
		{
			hours+=12
		}
	}
	else{
		if(hours === 12)
		{
			hours = 0;
		}
	}

	const d = new Date(date);
	d.setHours(hours,minutes);

	return d;
}

export const tripPlannerTrip = createSelector(
	[getTripPlannerSelector,tripPlannerSchedule,getRoutesSelector],
	(tripplanner,schedule,routes) =>{

		if(tripplanner.entities)
		{
			const ids = tripplanner.entities.request[schedule.request].trip;
			
			return ids.map(tripId => {
				const trip = tripplanner.entities.trip[tripId];
				const leg = trip.leg.map(legId => {
					const l = tripplanner.entities.leg[legId];
					const {origTimeMin,origTimeDate,destTimeMin,destTimeDate} = l;
					const origDate = getDate(origTimeMin,origTimeDate);
					const destDate = getDate(destTimeMin,destTimeDate);
					const line = {...routes.entities.route[l.line]};
					return {...l,origDate,destDate,line};
				});

				return {...trip,leg};
			});
		}

		return [];
	}
)

export const tripPlannerTripDetails = createSelector(
	[getTripPlannerSelector,getStationsSelector,getRoutesSelector],
	(tripplanner,stations,routes) =>{
		if( tripplanner.tripId)
		{
			const details = tripplanner.entities.trip[tripplanner.tripId];
			const leg = details.leg.map(id => {
				const l = {...tripplanner.entities.leg[id]};

				l.origin = {...stations.entities.station[l.origin]};
				l.destination = {...stations.entities.station[l.destination]};

				if(routes.entities) l.line = {...routes.entities.route[l.line]};

				return l;
			});

			return {...details,leg};
		}

		return {};
	}
)

const getServiceAdvisorySelector = state => state.serviceAdvisory;

export const serviceAdvisoryIsFetching = createSelector(getServiceAdvisorySelector,serviceAdvisory =>{

	if(serviceAdvisory.hasOwnProperty('isFetching'))
	{
		return serviceAdvisory.isFetching;
	}
	return false;
});

export const serviceAdvisoryResponse = createSelector(getServiceAdvisorySelector,serviceAdvisory =>{
	const {entities,result} = serviceAdvisory;
	if( entities && result)
	{
		const response = entities.response[result];
		const bsa = response.bsa.map(id =>
		{
			const data = entities.bsa[id];
			const description = entities.description[data.description];
			const sms_text = entities.sms_text[data.sms_text];

			return {
				...data,
				description,
				sms_text,
			};
		});

		return {
			...response,
			bsa,
		}
	}

	return {};
})


const getElevatorInfoSelector = state => state.elevatorInfo;

export const elevatorInfoIsFetching = createSelector(getElevatorInfoSelector,elevatorInfo =>{
	if(elevatorInfo.hasOwnProperty('isFetching'))
	{
		return elevatorInfo.isFetching;
	}
	return false;
});

export const elevatorInfoResponse = createSelector(getElevatorInfoSelector,elevatorInfo =>{

	const {entities,result} = elevatorInfo;
	if( entities && result)
	{
		const response = entities.response[result];
		const bsa = response.bsa.map(id =>{
			const data = entities.bsa[id];
			const description = entities.description[data.description];
			const sms_text = entities.sms_text[data.sms_text];

			return {
				...data,
				description,
				sms_text,
			}
		});

		return {
			...response,
			bsa,
		}
	}

	return {};
});

const getGeolocation = state => state.geolocation;

export const closestStation = createSelector(
	[getGeolocation,stationsList],
	(geolocation, stationsList) =>{

	if( geolocation.coords)
	{
		const coords = stationsList.map(station => {
			return {
				latitude:parseFloat(station.gtfs_latitude),
				longitude:parseFloat(station.gtfs_longitude)};
		});
		const coord = {
			latitude:geolocation.coords.latitude,
			longitude:geolocation.coords.longitude};
		
		const index = getClosestCoordIndex(coord,coords);

		return stationsList[index];
	}

	return {};
});