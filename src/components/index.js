import React from 'react';
import PropTypes from 'prop-types'
import {View, Text} from 'react-native'
import styles from './styles'
import Logger from 'js-logger'

function LocationScreenListHeader({abbr,name,address,city,state,zipcode,county}) {
	return (
		<View style={{padding:15,flex:1, justifyContent:'flex-end', height:200}}>
			<View>
				<Text style={{fontSize:50}}>{abbr}</Text>
			</View>
			<View style={{marginLeft:10}}>
				<Text style={{fontSize:20}}>{name}</Text>
				<View style={{marginLeft:40}}>
					<Text>{address}</Text>
					<Text>{city}, {state}, {zipcode}</Text>
				</View>
				<View style={{flexDirection:'row',justifyContent:'flex-end'}}>
					<Text style={{fontSize:12}}>county: {county}</Text>
				</View> 
			</View>
		</View>
	)
}

LocationScreenListHeader.propTypes = {
	name : PropTypes.string.isRequired,
	abbr:PropTypes.string.isRequired,
	gtfs_latitude:PropTypes.string.isRequired,
	gtfs_longitude:PropTypes.string.isRequired,
	address:PropTypes.string.isRequired,
	city:PropTypes.string.isRequired,
	county:PropTypes.string.isRequired,
	state:PropTypes.string.isRequired,
	zipcode:PropTypes.string.isRequired,
	date:PropTypes.string.isRequired,
	time:PropTypes.string.isRequired,
}

export {LocationScreenListHeader}

