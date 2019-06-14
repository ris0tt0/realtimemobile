import {connect} from 'react-redux'
import Logger from 'js-logger'
import Planner from './Planner'
import { stationsList, closestStation, geoLocationIsFetching } from '../../selectors';
import { fetchTripPlanning, fetchGeolocation, fetchRoutes, recieveGeoLocation } from '../../actions';

const mapStateToProps = state =>{
	return {
		stations:stationsList(state),
		closestStation:closestStation(state),
		isClosestStationFetching:geoLocationIsFetching(state),
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onSearch:(origin,ending,dateby,date) => {
			dispatch(fetchRoutes());
			dispatch(fetchTripPlanning(origin,ending,dateby,date));
		},
		onLocation:() => dispatch(fetchGeolocation()),
		clearClosestStation:() => dispatch(recieveGeoLocation({})),
	}
}

const PlannerContainer = connect(mapStateToProps,mapDispatchToProps)(Planner)

export default PlannerContainer;