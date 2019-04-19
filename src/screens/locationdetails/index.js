import {connect} from 'react-redux'
import Logger from 'js-logger'
import LocationDetails from './LocationDetails'

const mapStateToProps = state =>{

	return {ifFetching:false};
}

const mapDisptachToProps = dispatch =>{
	return {};
}

const LocationDetailsContainer = connect(mapStateToProps,mapDisptachToProps)(LocationDetails);

export default LocationDetailsContainer;