import {connect} from 'react-redux'
import Logger from 'js-logger'
import {Location} from './Location'
import { rteIsFetching,rteResponse, rtePlatformMap } from '../../selectors';

const mapStateToProps = state => {

	const isFetching = rteIsFetching(state);
	const response = rteResponse(state);
	const platformMap = rtePlatformMap(state);

	return {isFetching,response,platformMap};
}

const mapDispatchToProps = disptach => {

	const onClick = () => Logger.info('onclick');

	return {onClick};
}

const LocationContainer = connect(mapStateToProps,mapDispatchToProps)(Location);

export default LocationContainer;