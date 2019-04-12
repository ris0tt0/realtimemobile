import {connect} from 'react-redux'
import Logger from 'js-logger'
import Station from './Station'
import { stationsList, stationsIsFetching } from '../../selectors';

const mapStateToProps = state => {
	const stations = stationsList(state);
	const isFetching = stationsIsFetching(state);

	return {stations,isFetching}
}

const mapDispatchToProps = dispatch => {
	const onStationSelect = stationAbbr =>
	{
		Logger.info(`onStationSelect: ${stationAbbr}`);
	};

	return{
		onStationSelect,
	}
}

const StationContainer = connect(mapStateToProps,mapDispatchToProps)(Station);

export default StationContainer;