import React from 'react'
import PropTypes from 'prop-types'
import {View,Text} from 'react-native'
import Logger from 'js-logger'
import {WaitingScreen} from '../../components/'

function Advisory({isFetching,serviceAdvisory,elevatorInfo}) {
	
	if( isFetching) return <WaitingScreen />

	const service = serviceAdvisory.bsa[0] && serviceAdvisory.bsa[0].description ? serviceAdvisory.bsa[0].description : '';
	const elevator = elevatorInfo.bsa[0] && elevatorInfo.bsa[0].description ? elevatorInfo.bsa[0].description : '';
	return (
		<View>
			<Text>Service Advisory:</Text>
			<Text style={{margin:10}}>{service}</Text>
			<Text>Elevator Status:</Text>
			<Text style={{margin:10}}>{elevator}</Text>
		</View>
	);
}

Advisory.propTypes = {
	isFetching:PropTypes.bool.isRequired,
	serviceAdvisory:PropTypes.object.isRequired,
	elevatorInfo:PropTypes.object.isRequired,
}

export {Advisory}

