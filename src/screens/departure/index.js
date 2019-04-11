import {connect} from 'react-redux'
import Logger from 'js-logger'
import Departure from './Departure'
import { fetchRoutes, fetchTrainCount, fetchRTE } from '../../actions';
import { routesList, routesResponse, stationsList, stationsIsFetching } from '../../selectors';

const mapStateToProps = state => {

	const response = routesResponse(state);
	const routes = routesList(state);
	const stations = stationsList(state);
	const isFetching = stationsIsFetching(state);

	return {
		message:response.message,
		stations,
		routes,
		isFetching,
	}
}

const mapDispatchToProps = disptach => {
	return {
		onRoutes: () => disptach(fetchRoutes()),
		onTrainCount: () => disptach(fetchTrainCount()),
		onRTE: abbr => disptach(fetchRTE(abbr)),
	}
}

const DepartureContainer = connect(mapStateToProps,mapDispatchToProps)(Departure);

export default DepartureContainer;