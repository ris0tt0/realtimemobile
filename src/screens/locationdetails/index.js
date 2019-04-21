import {connect} from 'react-redux'
import Logger from 'js-logger'
import LocationDetails from './LocationDetails'
import { stationsDetailIsFetching, stationsDetailStation, routesIsFetching, stationsDetailStationRoutes } from '../../selectors';

const mapStateToProps = state =>{

	const details = stationsDetailStation(state);
	const routes = stationsDetailStationRoutes(state);

	return {
		isFetching:stationsDetailIsFetching(state) || routesIsFetching(state),
		details,
		routes,
	};
}

const LocationDetailsContainer = connect(mapStateToProps)(LocationDetails);

export default LocationDetailsContainer;