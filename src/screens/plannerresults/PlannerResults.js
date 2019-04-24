import React from 'react'
import PropTypes from 'prop-types'
import {FlatList,View,Text,TouchableHighlight} from 'react-native'
import Logger from 'js-logger'
import {WaitingScreen, TripBar, TripTime, TripDuration, TripFare} from '../../components/'

function PlannerResults({navigation:{navigate},isFetching,originStation,destinationStation,schedule,trip,onTrip}) {

	if(isFetching) return <WaitingScreen />

	Logger.info(navigate);

	const resultRenderItem = ({item,index}) =>(
		<TouchableHighlight key={index} onPress={() =>{
			onTrip(item.id);	
			navigate('PlannerDetails')
		}} >
			<View style={{flex:1}}>
				<TripBar leg={item.leg}/>
				<View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
					<TripTime time={item['@origTimeMin']}/>
					<TripDuration duration={item['@tripTime']}/>
					<TripFare fare={item['@fare']}/>
					<TripTime time={item['@destTimeMin']}/>
				</View>
			</View>
		</TouchableHighlight>
	);

	return (
		<View>
			<View>
				<Text>{originStation.name}</Text>
				<Text>{destinationStation.name}</Text>
			</View>
			<View>
				<Text>{schedule.date} {schedule.time}</Text>
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

