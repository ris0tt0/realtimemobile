import {connect} from 'react-redux'
import { PlannerDetails } from './PlannerDetails';
import Logger from 'js-logger'

const mapStateToProps = state =>{
	return{param:1}
};

const mapDispatachToProps = disptach =>{
	return{click:()=>Logger.info('click')}
};

const PlannerDetailsContainer = connect(mapStateToProps,mapDispatachToProps)(PlannerDetails);

export default PlannerDetailsContainer;