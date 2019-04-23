import {connect} from 'react-redux'
import Logger from 'js-logger'
import Planner from './Planner'
import { stationsList } from '../../selectors';
import { fetchTripPlanning } from '../../actions';

const mapStateToProps = state =>{
	return {
		stations:stationsList(state),
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onSearch:(origin,ending) => dispatch(fetchTripPlanning(origin,ending))
	}
}

const PlannerContainer = connect(mapStateToProps,mapDispatchToProps)(Planner);

export default PlannerContainer;