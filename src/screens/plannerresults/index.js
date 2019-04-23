import {connect} from 'react-redux'
import Logger from 'js-logger'
import {PlannerResults} from './PlannerResults'
import { tripPlannerIsFetching, tripPlannerOriginStation, tripPlannerDestinationStation, tripPlannerSchedule, tripPlannerTrip } from '../../selectors';

const mapStateToProps = state =>{
	return {
		isFetching:tripPlannerIsFetching(state),
		originStation:tripPlannerOriginStation(state),
		destinationStation:tripPlannerDestinationStation(state),
		schedule:tripPlannerSchedule(state),
		trip:tripPlannerTrip(state),
	}
};

const mapDispatchToProps = dispatch =>{
	return {onClick:()=>Logger.info('on click')}
};

const PlannerResultsContainer = connect(mapStateToProps,mapDispatchToProps)(PlannerResults);

export default PlannerResultsContainer;