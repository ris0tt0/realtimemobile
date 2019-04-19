import React from 'react'
import PropTypes from 'prop-types'
import {View,Text} from 'react-native'

function LocationDetails({isFetching}) {
	return (
		<View>
			<Text>details</Text>
		</View>
	)
}

LocationDetails.propTypes = {
	isFetching:PropTypes.bool.isRequired,
}

export default LocationDetails

