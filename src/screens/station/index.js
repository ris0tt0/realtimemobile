import {connect} from 'react-redux'
import Logger from 'js-logger'
import Station from './Station'
import { stationsList, stationsIsFetching } from '../../selectors';
import { fetchRTE } from '../../actions';

const mapStateToProps = state => {
	const stations = stationsList(state);
	const isFetching = stationsIsFetching(state);

	return {stations,isFetching}
}

const mapDispatchToProps = dispatch => {

	const onStationSelect = stationAbbr => dispatch(fetchRTE(stationAbbr))

	return{
		onStationSelect,
	}
}

const StationContainer = connect(mapStateToProps,mapDispatchToProps)(Station);

export default StationContainer;