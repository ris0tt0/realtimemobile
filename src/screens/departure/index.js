import {connect} from 'react-redux'
import Logger from 'js-logger'
import { stationsList, stationsIsFetching } from '../../selectors';
import { fetchRTE } from '../../actions';
import Departure from './Departure';

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

const DepartureContainer = connect(mapStateToProps,mapDispatchToProps)(Departure);

export default DepartureContainer;