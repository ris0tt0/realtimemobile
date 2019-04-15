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

export const rteStationData = createSelector([getRealTimeEstimateSelector,rteResponse],(rte,response) =>{

	if(rte.entities)
	{
		const {station} = rte.entities;
		return response.station.map(id => station[id]);
	}

	return [];
});

export const rtePlatformMap = createSelector([getRealTimeEstimateSelector,rteStationData],
	(rte,station) =>{

		if(rte.entities)
		{
			/** TODO: if we ETD in other than platform map, move this bit of code
			 * into its own selector function.  for new, just showing the ETD by platform
			 * in the app.
			 */
			// replace ids with data.
			const stations = station.map( stationData =>{
				return stationData.etd.map(id =>	{
					const etd = rte.entities.etd[id];
					// add the estimates
					etd.estimate = etd.estimate.map(id => rte.entities.estimate[id]);
					return etd;
				});
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
						
						// make sure we have a map for each platform
						if( !map.has(etd.platform)) map.set(etd.platform,new Map());
						// map with abbr key and [estimate]
						if( !map.get(etd.platform).has(station.abbreviation)) map.get(etd.platform).set(station.abbreviation,{...station,estimate:[]});
						// add the estimate data to the object
						map.get(etd.platform).get(station.abbreviation).estimate.push({...etd});
					});
				});
				// sort by platform number
				return new Map([...map.entries()].sort());
			});
		}

		return [];
	});



const getTripPlannerSelector = state => state.tripplanner;

