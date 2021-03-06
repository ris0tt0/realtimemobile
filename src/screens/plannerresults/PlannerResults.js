import React from 'react'
import PropTypes from 'prop-types'
import {FlatList,View,StyleSheet,Text,TouchableOpacity} from 'react-native'
import Logger from 'js-logger'
import {WaitingScreen, TripBar, TripTime, TripDuration, TripFare} from '../../components/'
import { ListItemArrowForward } from '../../components/AIcons';
import { getHoursMinutes } from '../../Utils';

function PlannerResults({navigation:{navigate},isFetching,originStation,destinationStation,schedule,trip,onTrip}) {

	if(isFetching) return <WaitingScreen />

	function resultRenderItem({item,index}){
		return <TouchableOpacity key={index} style={styles.listItem} onPress={() =>{
			onTrip(item.id);	
			navigate('PlannerDetails',{name:`${item.origTimeMin}-${item.destTimeMin}`});
		}} >
			<View style={styles.renderItemContainer}>
				<View style={{flex:1}}>
					<View style={styles.renderItemTop}>
						<TripTime time={item.origTimeMin}/>
						<View style={styles.renderItemTripBar}>
							<TripBar leg={item.leg} showMin={false}/>
						</View>
						<TripTime time={item.destTimeMin}/>
					</View>
					<View style={styles.renderItemBottom}>
						<TripDuration duration={getHoursMinutes(parseInt(item.tripTime,10))}/>
						<TripFare fare={item.tripfare}/>
					</View>
				</View>
				<View style={{paddingLeft:5,paddingRight:5}}>{ListItemArrowForward()}</View>
			</View>
		</TouchableOpacity>
	}

	resultRenderItem.propTypes = {
		item:PropTypes.object.isRequired,
		index:PropTypes.number.isRequired,
	};

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
	navigation:PropTypes.shape({
		navigate:PropTypes.func.isRequired,
	}).isRequired,
	isFetching:PropTypes.bool.isRequired,
	originStation:PropTypes.object.isRequired,
	destinationStation:PropTypes.object.isRequired,
	schedule:PropTypes.object.isRequired,
	trip:PropTypes.array.isRequired,
	onTrip:PropTypes.func.isRequired,
};

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
	renderItemContainer:{
		flexDirection:'row',
		alignItems:'center',
	},
	renderItemTop:{
		flexDirection:'row',
		alignItems:'center',

		// borderWidth:1,
		// borderColor:'red',
	},
	renderItemBottom:{
		flexDirection:'row',
		justifyContent:'space-around',

		// borderWidth:1,
		// borderColor:'pink',
	},
	renderItemTripBar:{
		flex:1,
		height:10,
		paddingLeft:10,
		paddingRight:10,
		borderColor:'white',
		borderWidth:1,
		borderRadius:10,
	},
})
