import React from 'react';
import PropTypes from 'prop-types'
import {ActivityIndicator, Button, ImageBackground, View, Text} from 'react-native'
import styles from './styles'
import Logger from 'js-logger'

function LocationScreenListHeader({onRefresh,onDetails,abbr,name,address,city,state,zipcode,county,time,date}) {
	return (
		<View style={{padding:15,flex:1, justifyContent:'flex-end', height:200}}>
		{/* <ImageBackground source={require('../../assets/splash.png')} style={{width:200,height:200}} > */}
			<View style={{flexDirection:'row'}}>
				<Text style={{fontWeight:'bold', fontSize:30}}>{name}</Text>
				<Button title='station info' onPress={() => onDetails()} ></Button>
			</View>
			<View style={{flexDirection:'row'}}>
				<View style={{marginLeft:3}}>
					<Text>{address}</Text>
					<Text>{city}, {state}, {zipcode}</Text>
					<Text style={{fontWeight:'bold',fontSize:10,color:'darkgray'}}>{date} - {time}</Text>
				</View>
			</View>
			<Button title='refresh' onPress={event => onRefresh()} />
		{/* </ImageBackground> */}
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

function WaitingScreen({title}){
	return (
		<View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
			<ActivityIndicator size='large' color='black' />
			<Text>{title ? title : 'Loading'}</Text>
		</View>
	)
}

WaitingScreen.propTypes = {
	title:PropTypes.string,
}

export {LocationScreenListHeader,WaitingScreen}

