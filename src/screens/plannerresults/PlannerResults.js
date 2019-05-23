import React from 'react'
import PropTypes from 'prop-types'
import {FlatList,View,StyleSheet,Text,TouchableHighlight} from 'react-native'
import Logger from 'js-logger'
import {WaitingScreen, TripBar, TripTime, TripDuration, TripFare} from '../../components/'
import { ListItemArrowForward } from '../../components/AIcons';

function PlannerResults({navigation:{navigate},isFetching,originStation,destinationStation,schedule,trip,onTrip}) {

	if(isFetching) return <WaitingScreen />

	const resultRenderItem = ({item,index}) =>(
		<TouchableHighlight key={index} style={styles.listItem} onPress={() =>{
			onTrip(item.id);	
			navigate('PlannerDetails')
		}} >
			<View style={{flexDirection:'row',alignItems:'center'}}>
				<View style={{flex:1}}>
					<TripBar leg={item.leg}/>
					<View style={{flexDirection:'row',justifyContent:'space-around'}}>
						<TripTime time={item.origTimeMin}/>
						<TripDuration duration={item.tripTime}/>
						<TripFare fare={item.fare}/>
						<TripTime time={item.destTimeMin}/>
					</View>
				</View>
				{ListItemArrowForward()}
			</View>
		</TouchableHighlight>
	);

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{originStation.name}</Text>
				<Text style={styles.title}>{destinationStation.name}</Text>
			</View>
			<View>
				<Text style={styles.date}>{schedule.date} {schedule.time}</Text>
			</View>
			<FlatList
				data={trip}
				renderItem={resultRenderItem}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}

PlannerResults.propTypes = {

}

export {PlannerResults}


const styles = StyleSheet.create({
	container:{
		paddingLeft:10,
		paddingRight:10,
	},
	title:{
		fontSize:20,
	},
	date:{
		fontSize:10,
		color:'gray',
	},
	listItem:{
		borderWidth:1,
		borderColor:'lightgray',
		borderRadius:4,
		marginBottom:2,
	},
})
