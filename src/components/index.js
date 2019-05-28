import React from 'react';
import PropTypes from 'prop-types'
import {ActivityIndicator, Button, ImageBackground, View,StyleSheet, Text, TouchableWithoutFeedback} from 'react-native'
// import styles from './styles'
import Logger from 'js-logger'
import { PlannerMoney, StationInfo, StationRefresh, Timelapse, PlannerMap } from './AIcons';

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
		// borderWidth:1,
		// borderColor:'red',
		// borderRadius:4,
		// marginBottom:2,
		flex:1,
	},
	tripbar__leg:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	tripbar__LegText:{
		fontSize:12,
	},
	tripTime__container:{
		padding:4,
	},
	tripTime__title:{
		fontWeight:'bold',
		fontSize:16,
	}
})

function TripBar({leg,showMin = false}) {
	const totalDuration = leg[leg.length-1].destDate - leg[0].origDate;

	const legColors = [];
	leg.forEach( (tripLeg,index,list) =>{
		let total = tripLeg.destDate - tripLeg.origDate;
		let flex = total/totalDuration;
		let min = total/1000/60;
		
		legColors.push(
			<View
			key={`${tripLeg.line.hexcolor}`}
			style={{
				...styles.tripbar__leg,
				backgroundColor:tripLeg.line.hexcolor,
				flex,
			}}
		>{showMin ? <Text style={styles.tripbar__LegText}>{min}</Text> : null}</View>);

		// look for layovers
		const next = list[index+1];
		if( next && next.origDate - tripLeg.destDate > 0)
		{
			total = next.origDate - tripLeg.destDate;
			flex = total/totalDuration;
			min = total/1000/60;
			legColors.push(
				<View
				key={`${tripLeg.destDate}`}
				style={{
					...styles.tripbar__leg,
					backgroundColor:'lightgray',
					flex,
				}}
			></View>);
		}
	});

	return (
		<View style={styles.tripbar__container}>
			<View style={{flexDirection:'row',flex:1}}>
				{legColors}
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
		<View style={styles.tripTime__container}>
			<Text style={styles.tripTime__title}>{time}</Text>
		</View>
	)
}

TripTime.propTypes = {

}

function TripChanges({changes}) {
	return (
		<View style={{flexDirection:'row',alignItems:'center'}}>
			<PlannerMap />
			<Text style={{paddingLeft:5}}>{changes}</Text>
		</View>
	)
}

TripChanges.propTypes = {

}

function TripFare({fare}) {
	return (
		<View style={{flexDirection:'row', alignItems:'center'}}>
			<PlannerMoney />
			<Text style={{paddingLeft:5}}>${fare}</Text>
		</View>
		);
}

TripFare.propTypes = {

}

function TripDuration({duration}) {
	return (
	<View style={{flexDirection:'row',alignItems:'center'}}>
		<Timelapse />
		<Text style={{paddingLeft:5}}>{duration}</Text>
	</View>
	);
}

TripDuration.propTypes = {

}

function TripLineBar({color}){

	return(
		<View style={
			{
				marginLeft:5,
				marginTop:5,
				marginBottom:5,
				backgroundColor:color,
				width:10,
				borderTopLeftRadius:5,
				borderTopRightRadius:5,
				borderBottomLeftRadius:5,
				borderBottomRightRadius:5,
			}}>
		</View>
	)
}

export {WaitingScreen,TripBar,TripTime,TripChanges,TripFare,TripDuration,TripLineBar}

