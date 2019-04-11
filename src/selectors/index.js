import {createSelector} from 'reselect';
import Logger from 'js-logger';

/**
 * Routes.
 */
const getRoutesSelector = state => state.routes;

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
const getTripPlannerSelector = state => state.tripplanner;

