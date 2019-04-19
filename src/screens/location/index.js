import {connect} from 'react-redux'
import Logger from 'js-logger'
import {Location} from './Location'
import { rteIsFetching,rteResponse, rtePlatformMap, rteLocationScreenData, rteStationsData } from '../../selectors';

const mapStateToProps = state => {

	const isFetching = rteIsFetching(state);
	const locationScreenData = rteLocationScreenData(state);
	const stationsData = rteStationsData(state);

	return {isFetching,locationScreenData,stationsData};
}

const mapDispatchToProps = disptach => {

	const onClick = () => Logger.info('onclick');

	return {onClick};
}

const LocationContainer = connect(mapStateToProps,mapDispatchToProps)(Location);

export default LocationContainer;