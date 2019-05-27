import React from 'react';
import PropTypes from 'prop-types'
import { Dimensions, View,StyleSheet, Text} from 'react-native'
import Logger from 'js-logger'
import { red } from 'ansi-colors';

const renderSectionHeader = ({item,index,section: {title}}) => 
	<View style={styles.renderSectionHeader}>
		<Text style={styles.renderSectionHeaderText}>{title}</Text>
	</View>
const renderItem = ({item:{abbreviation,destination,estimate}, index, section}) =>{
	const bgcolor = estimate[0] && estimate[0].hexcolor ? estimate[0].hexcolor : 'white';

	return (	
	<View style={styles.renderItem}>
		<View style={{ borderLeftWidth:1,backgroundColor:bgcolor, width:15}}></View>
		<View style={{paddingLeft:4}}>
			<Text style={{fontSize:16}}>{destination}</Text>
		</View>
		<View style={styles.renderItemDestnation}>
				{estimate.map((item,index) => destinationTrainInfo({...item,index}))}
		</View>
	</View>)
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


const styles = StyleSheet.create({
	renderSectionHeader:{
		marginTop:10,
		paddingLeft:10,
		borderColor:'black',
		borderTopWidth:1,
		// borderTopColor:'black',
		borderLeftWidth:1,
		// borderLeftColor:'black',
		borderRightWidth:1,
		backgroundColor: 'whitesmoke',
	},
	renderSectionHeaderText:{
		fontWeight: 'bold',
		fontSize:18,
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
		borderRightWidth:1,
		// borderColor:'red',
		// borderWidth:1,
		justifyContent:'flex-end',
	},
});

export { renderItem, renderSectionHeader};