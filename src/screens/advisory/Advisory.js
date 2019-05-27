import React from 'react'
import PropTypes from 'prop-types'
import {View,StyleSheet,Text} from 'react-native'
import Logger from 'js-logger'
import {WaitingScreen} from '../../components/'
import Colors from '../../constants/Colors';

function Advisory({isFetching,serviceAdvisory,elevatorInfo}) {
	
	if( isFetching) return <WaitingScreen />

	const service = serviceAdvisory.bsa[0] && serviceAdvisory.bsa[0].description ? serviceAdvisory.bsa[0].description : '';
	const elevator = elevatorInfo.bsa[0] && elevatorInfo.bsa[0].description ? elevatorInfo.bsa[0].description : '';

	return (
		<View style={styles.container}>
			<Text style={styles.title}>service advisory:</Text>
			<Text style={styles.body}>{service}</Text>
			<Text style={styles.title}>elevator status:</Text>
			<Text style={styles.body}>{elevator}</Text>
		</View>
	);
}

Advisory.propTypes = {
	isFetching:PropTypes.bool.isRequired,
	serviceAdvisory:PropTypes.object.isRequired,
	elevatorInfo:PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
	container:{
		padding:10,
	},
	title:{
		backgroundColor:Colors.itemBackgroundColor,
		color:Colors.itemBorderColor,
		fontSize:18,
		fontWeight:'bold',
		paddingBottom:10,
	},
	body:{
		backgroundColor:Colors.itemBackgroundColor,
		marginBottom:10,
		paddingBottom:5,
		paddingLeft:5,
		paddingRight:5,
	}
})

export {Advisory}

