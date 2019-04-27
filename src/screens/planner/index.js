import {connect} from 'react-redux'
import Logger from 'js-logger'
import PlannerAdroid from './PlannerAndroid'
import PlannerIOS from './PlannerIOS'
import { stationsList } from '../../selectors';
import { fetchTripPlanning } from '../../actions';
import {Platform} from 'react-native'

const mapStateToProps = state =>{
	return {
		stations:stationsList(state),
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onSearch:(origin,ending) => dispatch(fetchTripPlanning(origin,ending))
	}
}

const PlannerContainer = Platform.OS === 'ios' ?
	connect(mapStateToProps,mapDispatchToProps)(PlannerIOS) :
	connect(mapStateToProps,mapDispatchToProps)(PlannerAdroid);

export default PlannerContainer;