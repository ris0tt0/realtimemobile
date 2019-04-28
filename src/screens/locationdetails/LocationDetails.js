import React from 'react'
import PropTypes from 'prop-types'
import {View,Text} from 'react-native'
import Logger from 'js-logger'
import { WaitingScreen } from '../../components';
import {RouteLineArrows} from '../../components/AIcons';

function LocationDetails({isFetching,details,routes}) {

	if(isFetching) return <WaitingScreen />

	const routeNames = routes.map((route,index) => (
		<View key={index} style={{backgroundColor:'whitesmoke', flexDirection:'row'}}>
			<RouteLineArrows color={route.hexcolor} />
			<Text style={{paddingLeft:4}}>{route.name}</Text>
		</View>
		));

	// Logger.info(routes);

	return (
		<View style={{flex:1}}>
			<Text>{details.name}</Text>
			<Text>{details.address}</Text>
			<Text>{details.city}, {details.state}, {details.zipcode}</Text>
			<Text>{details.cross_street['#cdata-section']}</Text>
			<Text style={{color:'darkgray', fontSize:10}}>info:</Text>
			<Text>{details.intro['#cdata-section']}</Text>
			<Text style={{color:'darkgray', fontSize:10}}>platform info:</Text>
			<Text>{details.platform_info}</Text>
			<Text style={{color:'darkgray', fontSize:10}}>lines serving this station:</Text>
			<View style={{flexDirection:'column'}}>{routeNames}</View>
		</View>
	)
}

LocationDetails.propTypes = {
	isFetching:PropTypes.bool.isRequired,
	details:PropTypes.shape({
		abbr:PropTypes.string,
		address:PropTypes.string,
		city:PropTypes.string,
		county:PropTypes.string,
		name:PropTypes.string,
		platform_info:PropTypes.string,
		state:PropTypes.string,
		zipcode:PropTypes.string,
	}).isRequired,
	routes:PropTypes.arrayOf(PropTypes.shape({
		abbr:PropTypes.string.isRequired,
		color:PropTypes.string.isRequired,
		hexcolor:PropTypes.string.isRequired,
		name:PropTypes.string.isRequired,
		routeID:PropTypes.string.isRequired,
	})).isRequired,
}

export default LocationDetails

