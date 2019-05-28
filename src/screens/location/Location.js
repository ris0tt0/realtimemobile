import React from 'react'
import PropTypes from 'prop-types'
import { View, SectionList, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native'
import Logger from 'js-logger'
import { WaitingScreen } from '../../components';
import { StationInfo, StationRefresh } from '../../components/AIcons';

function renderSectionHeader({item,index,section: {title}}){
	return (
	<View style={styles.renderSectionHeader}>
		<Text style={styles.renderSectionHeaderText}>platform {title}</Text>
	</View>
	)
}

renderSectionHeader.propTypes = {
	item:PropTypes.object,
	index:PropTypes.number,
	section:PropTypes.object,
}
	
function renderItem({item:{abbreviation,destination,estimate}, index, section}){
	const bgcolor = estimate[0] && estimate[0].hexcolor ? estimate[0].hexcolor : 'white';

	return (	
	<View style={styles.renderItem}>
		<View style={{backgroundColor:bgcolor, width:15}}></View>
		<View style={{paddingLeft:4}}>
			<Text style={{fontSize:16}}>{destination}</Text>
		</View>
		<View style={styles.renderItemDestnation}>
				{estimate.map((item,index) => destinationTrainInfo({...item,index}))}
		</View>
	</View>)
}

renderItem.propTypes = {
	item:PropTypes.object,
	index:PropTypes.number,
	section:PropTypes.object,
}

function destinationTrainInfo({minutes,length}) {
	return (
		<View key={minutes} style={{paddingBottom:4,margin:4,alignItems:'center'}}>
			<Text style={{fontSize:16}} >{minutes.toLowerCase() === 'leaving' ? minutes : `${minutes} min` }</Text>
			<Text style={{fontWeight:'bold',fontSize:10,color:'darkgray'}} >{length} car</Text>
		</View>
	)
}

destinationTrainInfo.propTypes = {
	minutes: PropTypes.string.isRequired,
	platform: PropTypes.string.isRequired,
	direction: PropTypes.string.isRequired,
	length: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	hexcolor: PropTypes.string.isRequired,
	bikeflag: PropTypes.string.isRequired,
	delay: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
}


/**
 * Location screen. displays the bart station real time estimates.
 */
function Location({navigation:{navigate},onRefresh,onDetails,isFetching,stationsData,locationScreenData:{date,time,message,name,abbr,platformSections}}) {

	// TODO create progress indicator to show loading.
	if(isFetching) return <WaitingScreen />

	const messageValue = message.warning ? <Text style={{backgroundColor:'yellow'}}>{message.warning}</Text> : <View />;
	const data = {
		...stationsData[0],
		time,
		date,
		onRefresh:() => onRefresh(stationsData[0].abbr),
		onDetails:() => {
			onDetails(stationsData[0].abbr);
			navigate('LocationDetails',{name:stationsData[0].name});
		},
	};

	return (
		<View style={{backgroundColor:'white',padding:10,flex:1}}>
			<SectionList
				style={{flex:1}}
				ListHeaderComponent={() => (
					<View style={{paddingBottom:5}}>
						<LocationScreenListHeader {...data} />
						{messageValue}
					</View>
				)}
				
				renderItem={renderItem}
				renderSectionHeader={renderSectionHeader}
				sections={platformSections}

				keyExtractor={(item,index) => `id${index}`}
			/>
		</View>
	)
}

Location.propTypes = {

}

function LocationScreenListHeader({
	onRefresh,
	onDetails,
	abbr,
	name,
	address,
	city,
	state,
	zipcode,
	county,
	time,
	date,
}) {
	return (
		<View style={{flex:1}}>
			<TouchableWithoutFeedback style={{paddingLeft:4}} onPress={onDetails} >
				<View style={{flexDirection:'row',alignItems:'center'}}>
					<Text style={{fontWeight:'bold', fontSize:18}}>{name}</Text>
					<StationInfo />
				</View>
			</TouchableWithoutFeedback>
			<View>
				<Text>{address}</Text>
				<Text>{city}, {state}, {zipcode}</Text>
				<TouchableWithoutFeedback style={{flexDirection:'row', alignItems:'center'}} onPress={onRefresh}>
					<View style={{flexDirection:'row',justifyContent:'flex-end'}}>
						<Text style={{fontWeight:'bold',fontSize:10,color:'darkgray'}}>{date} - {time}</Text>
						<StationRefresh />
					</View>
				</TouchableWithoutFeedback>
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

const styles = StyleSheet.create({
	renderSectionHeader:{
		marginTop:4,
		paddingBottom:5,
		paddingLeft:10,
		// borderColor:'gray',
		// borderTopWidth:1,
		// borderTopColor:'black',
		// borderLeftWidth:1,
		// borderLeftColor:'black',
		// borderRightWidth:1,
		backgroundColor: 'whitesmoke',
	},
	renderSectionHeaderText:{
		fontWeight: 'bold',
		fontSize:20,
		color: 'darkgray',
	},
	renderItem:{
		flexDirection:'row',
		flex:1,
		backgroundColor:'whitesmoke'
	},
	renderItemDestnation:{
		flex:1,
		flexDirection:'row',
		justifyContent:'flex-start',
		// borderRightWidth:1,
		// borderColor:'gray',
		// borderColor:'red',
		// borderWidth:1,
		justifyContent:'flex-end',
	},
});

export {Location}

