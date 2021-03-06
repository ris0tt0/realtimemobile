import {connect} from 'react-redux'
import Logger from 'js-logger'
import LocationDetails from './LocationDetails'
import {
	stationsDetailIsFetching,
	stationsDetailStation,
	routesIsFetching,
	stationsDetailStationRoutes,
	stationsAccessData,
	stationsAccessIsFetching,
	} from '../../selectors';

const mapStateToProps = state =>{

	const details = stationsDetailStation(state);
	const routes = stationsDetailStationRoutes(state);
	const access = stationsAccessData(state);

	return {
		isFetching:stationsDetailIsFetching(state) || routesIsFetching(state) || stationsAccessIsFetching(state),
		details,
		routes,
		access,
	};
}

const LocationDetailsContainer = connect(mapStateToProps)(LocationDetails);

export default LocationDetailsContainer;