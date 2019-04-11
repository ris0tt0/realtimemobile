import React from 'react'
import PropTypes from 'prop-types'
import {Text,View} from 'react-native'
import Logger from 'js-logger'

function Homescreen(props) {
	
	Logger.info('homescreen');

	return (
		<View>
			<Text>home</Text>
		</View>
	)
}

Homescreen.propTypes = {

}

export default Homescreen

