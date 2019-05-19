import {connect} from 'react-redux'
import Logger from 'js-logger'
import Planner from './Planner'
import { stationsList, closestStation } from '../../selectors';
import { fetchTripPlanning, fetchGeolocation } from '../../actions';

const mapStateToProps = state =>{
	return {
		stations:stationsList(state),
		closestStation:closestStation(state),
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onSearch:(origin,ending) => dispatch(fetchTripPlanning(origin,ending)),
		onLocation:() => dispatch(fetchGeolocation()),
	}
}

const PlannerContainer = connect(mapStateToProps,mapDispatchToProps)(Planner)

export default PlannerContainer;