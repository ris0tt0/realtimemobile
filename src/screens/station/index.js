import {connect} from 'react-redux'
import Logger from 'js-logger'
import Station from './Station'

const mapStateToProps = state => {
	return {param:'dfadf'}
}

const mapDispatchToProps = dispatch => {
	return{
		onClick: () => Logger.info('onclick'),
	}
}

const StationContainer = connect(mapStateToProps,mapDispatchToProps)(Station);

export default StationContainer;