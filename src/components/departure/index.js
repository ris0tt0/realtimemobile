import {connect} from 'react-redux'
import Logger from 'js-logger'
import Departure from './Departure'

const mapStateToProps = state => {
	return {
		param:'parm',
	}
}

const mapDispatchToProps = disptach => {
	return {
		onClick: () => Logger.info('onclick'),
	}
}

const DepartureContainer = connect(mapStateToProps,mapDispatchToProps)(Departure);

export default DepartureContainer;