import React from 'react';
import PropTypes from 'prop-types'
import {View, Text} from 'react-native'
import styles from './styles'
import Logger from 'js-logger'

const renderSectionHeader = ({item,index,section: {title}}) => 
	<Text style={styles.LocationRenderSectionHeader}>{title}</Text>

const renderItem = ({item:{abbreviation,destination,estimate}, index, section}) =>
	<View style={{paddingLeft:4, paddingRight:4, marginBottom:4, marginTop:4, flexDirection:'row',flex:1, backgroundColor:'pink'}}>
		<View>
			<Text style={styles.LocationRenderItem}>{destination}</Text>
		</View>
		<View style={{flex:1}}>
			<View style={{flexDirection:'row', justifyContent:'flex-end'}}>{estimate.map((item,index) => destinationTrainInfo({...item,index}))}</View>
		</View>
	</View>

function destinationTrainInfo({minutes,length,index}) {
	return (
		<View key={index} style={{marginLeft:4,backgroundColor:'lightblue'}}>
			<Text>{minutes.toLowerCase() === 'leaving' ? minutes : `${minutes} min` }</Text>
			<Text>({length}) car</Text>
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


export { renderItem, renderSectionHeader};