import React from 'react';
import PropTypes from 'prop-types'
import { Dimensions, View, Text} from 'react-native'
import styles from './styles'
import Logger from 'js-logger'

const renderSectionHeader = ({item,index,section: {title}}) => 
	<Text style={{paddingLeft:3, fontWeight: 'bold', color: 'black', backgroundColor: 'darkgray'}}>{title}</Text>

const renderItem = ({item:{abbreviation,destination,estimate}, index, section}) =>{
	const bgcolor = estimate[0] && estimate[0].hexcolor ? estimate[0].hexcolor : 'white';

	return (	
	<View style={{paddingLeft:4, paddingRight:4, marginBottom:2, marginTop:2, flexDirection:'row',flex:1, backgroundColor:'whitesmoke'}}>
		<View style={{backgroundColor:bgcolor, width:10}} ></View>
		<View style={{flex:1, paddingLeft:4}}>
			<Text style={{fontWeight:'bold', fontSize:16}}>{destination}</Text>
		</View>
		<View style={{flex:1}}>
			<View style={{flex:1,flexDirection:'row', justifyContent:'flex-start'}}>
				{estimate.map((item,index) => destinationTrainInfo({...item,index}))}
			</View>
		</View>
	</View>)
}

function destinationTrainInfo({minutes,length,index}) {
	return (
		<View key={minutes} style={{marginLeft:8,alignItems:'center'}}>
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


export { renderItem, renderSectionHeader};