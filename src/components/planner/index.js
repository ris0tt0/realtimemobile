import {connect} from 'react-redux'
import Logger from 'js-logger'
import Planner from './Planner'

const mapStateToProps = state =>{
	return {
		param:'paaram'
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onClick: () => Logger.info('onclick')
	}
}

const PlannerContainer = connect(mapStateToProps,mapDispatchToProps)(Planner);

export default PlannerContainer;