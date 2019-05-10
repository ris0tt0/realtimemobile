import React from 'react'
import PropTypes from 'prop-types'
import {View,StyleSheet,TextInput} from 'react-native'
import {SearchBarIcon} from '../components/AIcons'

const styles = StyleSheet.create({
	search:{
		flex: 0,
    flexDirection: 'row',
    // justifyContent: 'center',
		// alignItems: 'center',
		borderWidth:1,
		borderColor:'grey',
		borderStyle:'solid',
		borderRadius:4,
		marginBottom:10,
		// padding:2,
		// margin:5,
    // backgroundColor: '#009bda',
	},
	input: {
		flex:1,
		// borderWidth:1,
		// borderColor:'grey',
		// borderStyle:'solid',
		// backgroundColor:'white',
		// padding:5,
		// margin:5,
		fontSize: 16,
	},
});

function StationSearchInput({onText}) {
	return (
		<View style={styles.search}>
			{SearchBarIcon()}
			<TextInput
				style={styles.input}
				placeholder='Search by Station'
				placeholderTextColor='darkgray'
				onChangeText={onText}></TextInput>
		</View>
	)
}

StationSearchInput.propTypes = {
	onText:PropTypes.func.isRequired,
}

export {StationSearchInput}

