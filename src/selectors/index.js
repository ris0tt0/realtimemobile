import {createSelector} from 'reselect';
import Logger from 'js-logger';

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

export const rteLocationStationsData = createSelector([]);

const getStationsDetailSelector = state => state.stationsDetail

export const stationsDetailIsFetching = createSelector(getStationsDetailSelector,stationsDetail =>{
		
	if(stationsDetail.hasOwnProperty('isFetching'))
	{
		return stationsDetail.isFetching;
	}

	return false;
});

export const stationsDetailStationID = createSelector(getStationsDetailSelector,stationsDetail =>{
	if(stationsDetail.entities && stationsDetail.entities.stations && stationsDetail.entities.stations.stationID.station)
	{
		return stationsDetail.entities.stations.stationID.station;
	}

	return '';
});

export const stationsDetailStation = createSelector([getStationsDetailSelector,stationsDetailStationID],(stationsDetail,stationId) =>{
	if(stationsDetail.entities && stationId.length > 0)
	{
		return stationsDetail.entities.station[stationId];
	}

	return {};
});

export const stationsDetailStationRoutes = createSelector([getRoutesSelector,stationsDetailStation],(routes,station) =>{
	if(routes.entities && station)
	{
		const r = [];
		if(station.north_routes && station.north_routes.route)
		{
			station.north_routes.route.forEach(id => r.push(routes.entities.route[id]))
		}
		if(station.south_routes && station.south_routes.route)
		{
			station.south_routes.route.forEach(id => r.push(routes.entities.route[id]))
		}

		return r;
	}

	return [];
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

export const tripPlannerTrip = createSelector(
	[getTripPlannerSelector,tripPlannerSchedule],
	(tripplanner,schedule) =>{

		if(tripplanner.entities)
		{
			const ids = tripplanner.entities.request[schedule.request].trip;
			
			return ids.map(tripId => {
				const trip = tripplanner.entities.trip[tripId];
				const leg = trip.leg.map(legId => tripplanner.entities.leg[legId]);

				return {...trip,leg};
			});
		}

		return [];
	}
)
