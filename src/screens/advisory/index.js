import {connect} from 'react-redux'
import Logger from 'js-logger'
import { Advisory } from './Advisory';
import { 
	serviceAdvisoryIsFetching,
	elevatorInfoIsFetching,
	serviceAdvisoryResponse,
	elevatorInfoResponse,
} from '../../selectors';

export const mapStateToProps = state =>{
	return {
		isFetching: serviceAdvisoryIsFetching(state) || elevatorInfoIsFetching(state),
		serviceAdvisory: serviceAdvisoryResponse(state),
		elevatorInfo: elevatorInfoResponse(state),
	}
};

export const mapDispatchToProps = dispatch =>
{
	return {
		click:() => Logger.info('click'),
	}
};

const AdvisoryContainer = connect(mapStateToProps,mapDispatchToProps)(Advisory);

export default AdvisoryContainer;