import {connect} from 'react-redux'
import { PlannerDetails } from './PlannerDetails';
import Logger from 'js-logger'
import { tripPlannerTripDetails, routesIsFetching } from '../../selectors';

const mapStateToProps = state =>{

	return{
		isFetching:routesIsFetching(state),
		details:tripPlannerTripDetails(state),
	};
};

const mapDispatachToProps = disptach =>{
	return{click:()=>Logger.info('click')}
};

const PlannerDetailsContainer = connect(mapStateToProps,mapDispatachToProps)(PlannerDetails);

export default PlannerDetailsContainer;