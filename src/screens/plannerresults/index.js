import {connect} from 'react-redux'
import Logger from 'js-logger'
import {PlannerResults} from './PlannerResults'

const mapStateToProps = state =>{
	return {param:'param 1'}
};

const mapDispatchToProps = dispatch =>{
	return {onClick:()=>Logger.info('on click')}
};

const PlannerResultsContainer = connect(mapStateToProps,mapDispatchToProps)(PlannerResults);

export default PlannerResultsContainer;