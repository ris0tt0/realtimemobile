import {connect} from 'react-redux'
import Logger from 'js-logger'
import {Location} from './Location'
import { rteIsFetching, rteLocationScreenData, rteStationsData } from '../../selectors';
import { fetchRTE, fetchStationDetail, fetchRoutes, fetchStationAccess } from '../../actions';

const mapStateToProps = state => {

	const isFetching = rteIsFetching(state);
	const locationScreenData = rteLocationScreenData(state);
	const stationsData = rteStationsData(state);

	return {isFetching,locationScreenData,stationsData};
}

const mapDispatchToProps = (dispatch,ownProps) => {

	return {
		onRefresh:abbr => dispatch(fetchRTE(abbr)),
		onDetails:abbr =>{
			dispatch(fetchStationDetail(abbr));
			dispatch(fetchStationAccess(abbr));
			dispatch(fetchRoutes());
		},
	};
}

const LocationContainer = connect(mapStateToProps,mapDispatchToProps)(Location);

export default LocationContainer;