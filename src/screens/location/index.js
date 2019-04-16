import {connect} from 'react-redux'
import Logger from 'js-logger'
import {Location} from './Location'
import { rteIsFetching,rteResponse, rtePlatformMap, rteLocationScreenData } from '../../selectors';

const mapStateToProps = state => {

	const isFetching = rteIsFetching(state);
	const locationScreenData = rteLocationScreenData(state);

	return {isFetching,locationScreenData,/*platformSections*/};
}

const mapDispatchToProps = disptach => {

	const onClick = () => Logger.info('onclick');

	return {onClick};
}

const LocationContainer = connect(mapStateToProps,mapDispatchToProps)(Location);

export default LocationContainer;