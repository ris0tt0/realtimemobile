import {connect} from 'react-redux'
import Logger from 'js-logger'
import {PlannerResults} from './PlannerResults'
import { tripPlannerIsFetching, tripPlannerOriginStation, tripPlannerDestinationStation, tripPlannerSchedule, tripPlannerTrip, routesIsFetching } from '../../selectors';
import { setTripPLanningTripId } from '../../actions';

const mapStateToProps = state =>{
	return {
		isFetching:tripPlannerIsFetching(state) && routesIsFetching(state),
		originStation:tripPlannerOriginStation(state),
		destinationStation:tripPlannerDestinationStation(state),
		schedule:tripPlannerSchedule(state),
		trip:tripPlannerTrip(state),
	}
};

const mapDispatchToProps = dispatch =>{
	return {
		onTrip: id => dispatch(setTripPLanningTripId(id)) };
};

const PlannerResultsContainer = connect(mapStateToProps,mapDispatchToProps)(PlannerResults);

export default PlannerResultsContainer;