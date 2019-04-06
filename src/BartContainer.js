import {connect} from 'react-redux'
import Logger from 'js-logger'
import BartApp from './Bart'
// import { neoFeedLinks, neoFeedNearEarthObjects } from '../../selectors';

const mapStateToProps = state =>
{
	return {param:'hello'};
}

const mapStateToDispatch = dispatch =>
{
	return {onStuff:() => Logger.info()};
}

const BartContainer = connect(mapStateToProps,mapStateToDispatch)(BartApp);

export default BartContainer;