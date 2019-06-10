import React from 'react'
import PropTypes from 'prop-types'
import {View,StyleSheet,Text} from 'react-native'
import Logger from 'js-logger'
import {WaitingScreen} from '../../components/'
import Colors from '../../constants/Colors';

function Advisory({isFetching,serviceAdvisory,elevatorInfo}) {
	
	if( isFetching) return <WaitingScreen />

	const service = serviceAdvisory.bsa ? serviceAdvisory.bsa.map((bsa,index) => <Text key={index} style={styles.body}>{bsa.description}</Text>) : [];
	const elevator = elevatorInfo.bsa ? elevatorInfo.bsa.map((bsa,index) => <Text key={index} style={styles.body}>{bsa.description}</Text>) : [];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>service advisory:</Text>
			<View>{service}</View>
			<Text style={styles.title}>elevator status:</Text>
			<View>{elevator}</View>
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
		flex:1,
		padding:10,
		// backgroundColor:'lightgray',
	},
	title:{
		backgroundColor:Colors.itemBackgroundColor,
		color:Colors.itemBorderColor,
		fontSize:18,
		fontWeight:'bold',
		paddingBottom:10,
		paddingLeft:5,
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

