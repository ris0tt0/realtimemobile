import {connect} from 'react-redux'
import Logger from 'js-logger'
import Homescreen from './Home'

const mapStateToProps = state =>
{
	return {param:'hello'};
}

const mapStateToDispatch = dispatch =>
{
	return {onStuff:() => Logger.info()};
}

const HomescreenContainer = connect(mapStateToProps,mapStateToDispatch)(Homescreen);

export default HomescreenContainer;