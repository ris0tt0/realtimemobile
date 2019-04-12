import {connect} from 'react-redux'
import Logger from 'js-logger'
import {Location} from './Location'

const mapStateToProps = state => {

	const param1 = '1';
	return {param1};
}

const mapDispatchToProps = disptach => {

	const onClick = () => Logger.info('onclick');

	return {onClick};
}

const LocationContainer = connect(mapStateToProps,mapDispatchToProps)(Location);

export default LocationContainer;