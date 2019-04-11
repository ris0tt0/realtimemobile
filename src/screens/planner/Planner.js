import React from 'react'
import PropTypes from 'prop-types'
import {Button,View,Text} from 'react-native'

function Planner({onClick}) {
	return (
		<View>
			<Text>Planner</Text>
			<Button onPress={onClick} title='jonathan'>Clicker herer</Button>
		</View>
	)
}

Planner.propTypes = {

}

export default Planner

