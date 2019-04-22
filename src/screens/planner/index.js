import {connect} from 'react-redux'
import Logger from 'js-logger'
import Planner from './Planner'
import { fetchRoutes } from '../../actions';

const mapStateToProps = state =>{
	return {
		param:'paaram',
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onClick: () => dispatch( fetchRoutes() )
	}
}

const PlannerContainer = connect(mapStateToProps,mapDispatchToProps)(Planner);

export default PlannerContainer;