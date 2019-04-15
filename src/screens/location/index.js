import {connect} from 'react-redux'
import Logger from 'js-logger'
import {Location} from './Location'
import { rteIsFetching,rteResponse, rtePlatformMap } from '../../selectors';

const mapStateToProps = state => {

	const isFetching = rteIsFetching(state);
	const response = rteResponse(state);
	const platformMap = rtePlatformMap(state);

	const platformSections = [];
	
	// TODO fix this in the selector?
	platformMap.forEach(station =>{
		station.forEach((stationMap,platformName) =>{
			const section = {};
			section.title = `Platform:  ${platformName}`;
			section.data = [];
			// iterate over the map
			for(let destination of stationMap.values()){
				section.data.push(destination);
			}

			platformSections.push(section);
		})
	});

	return {isFetching,response,platformSections};
}

const mapDispatchToProps = disptach => {

	const onClick = () => Logger.info('onclick');

	return {onClick};
}

const LocationContainer = connect(mapStateToProps,mapDispatchToProps)(Location);

export default LocationContainer;