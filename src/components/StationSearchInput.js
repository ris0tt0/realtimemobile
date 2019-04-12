import React from 'react'
import PropTypes from 'prop-types'
import {View,Text,TextInput} from 'react-native'

import styles from './styles'

function StationSearchInput({onText}) {
	return (
		<View style={styles.StationSearchInput}>
			<TextInput onChangeText={onText}></TextInput>
		</View>
	)
}

StationSearchInput.propTypes = {
	onText:PropTypes.func.isRequired,
}

export {StationSearchInput}

