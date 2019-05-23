import React from 'react';
import PropTypes from 'prop-types'
import {ActivityIndicator, Button, ImageBackground, View,StyleSheet, Text, TouchableOpacity} from 'react-native'
// import styles from './styles'
import Logger from 'js-logger'
import { StationInfo, StationRefresh } from './AIcons';

function LocationScreenListHeader({onRefresh,onDetails,abbr,name,address,city,state,zipcode,county,time,date}) {
	return (
		<View style={{padding:15,flex:1, justifyContent:'flex-end', height:200}}>
		{/* <ImageBackground source={require('../../assets/splash.png')} style={{width:200,height:200}} > */}
			<View style={{flexDirection:'row',alignItems:'center'}}>
				<Text style={{fontWeight:'bold', fontSize:30}}>{name}</Text>
				<TouchableOpacity onPress={() => onDetails()} >
					{StationInfo()}
				</TouchableOpacity>
			</View>
			<View style={{flexDirection:'row'}}>
				<View style={{marginLeft:3}}>
					<Text>{address}</Text>
					<Text>{city}, {state}, {zipcode}</Text>
					<Text style={{fontWeight:'bold',fontSize:10,color:'darkgray'}}>{date} - {time}</Text>
				</View>
			</View>
			<TouchableOpacity onPress={() => onRefresh()} >
				{StationRefresh()}
			</TouchableOpacity>
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
const styles = StyleSheet.create({
	tripbar__container:{
		borderWidth:1,
		borderColor:'lightgray',
		borderRadius:4,
		marginBottom:2,
	},
	tripbar__leg:{
		// height:10,
		// width:50,
		flex:1,
	}
})

function TripBar({leg}) {

	return (
		<View style={styles.tripbar__container}>
			<View style={{flexDirection:'row',flex:1}}>
				{leg.map((item,index) => {
					const total = item.destDate - item.origDate;
					return (
						<View
							key={index}
							style={{...styles.tripbar__leg,backgroundColor:item.line.hexcolor}}
						><Text>{`${total/1000/60} min`}</Text></View>
						);
				})}
			</View>
		</View>
	)
}

TripBar.propTypes = {
	leg:PropTypes.array.isRequired,
	// "@bikeflag": "1",
	// "@destTimeDate": "04/22/2019",
	// "@destTimeMin": "12:47 AM",
	// "@destination": "MCAR",
	// "@line": "ROUTE 1",
	// "@load": "1",
	// "@order": "1",
	// "@origTimeDate": "04/21/2019",
	// "@origTimeMin": "11:46 PM",
	// "@origin": "ANTC",
	// "@trainHeadStation": "San Francisco International Airport",
}

function TripTime({time}) {
	return (
		<View>
			<Text>{time}</Text>
		</View>
	)
}

TripTime.propTypes = {

}

function TripChanges({changes}) {
	return (
		<View>
			<Text>changes:{changes}</Text>
		</View>
	)
}

TripChanges.propTypes = {

}

function TripFare({fare}) {
	return (
		<View>
			<Text>fare: {fare}</Text>
		</View>
		)
}

TripFare.propTypes = {

}

function TripDuration({duration}) {
	return (
	<View>
		<Text>{duration} min</Text>
	</View>
	)
}

TripDuration.propTypes = {

}

function TripLineBar({color}){

	return(
		<View style={{marginLeft:5,marginRight:5,marginTop:10,marginBottom:10,backgroundColor:color,width:10}}>
		</View>
	)
}

export {LocationScreenListHeader,WaitingScreen,TripBar,TripTime,TripChanges,TripFare,TripDuration,TripLineBar}

