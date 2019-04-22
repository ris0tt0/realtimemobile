import PropTypes from 'prop-types'
import {Icon} from 'expo'
import Colors from '../constants/Colors'
import React from 'react'
import {View} from 'react-native'
import { Platform } from 'expo-core'

function TabBarIcon({name,focused}) {
	
	return	(
		<Icon.Ionicons
			name={name}
			size={26}
			style={{ marginBottom: -3}}
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
		/>);
};

TabBarIcon.propTypes = {
	name:PropTypes.string.isRequired,
	focused:PropTypes.bool.isRequired,
};

function RouteLineArrows({color}) {
	return (
		<View style={{paddingLeft:3, paddingTop:3, flexDirection:'row'}}>
			<Icon.Ionicons
				name={Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'}
				size={13}
				color={color}
			/>
			<Icon.Ionicons
				name={Platform.OS === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-round-forward'}
				size={13}
				color={color}
			/>
		</View>
	)
}

RouteLineArrows.propTypes = {

}

export {TabBarIcon,RouteLineArrows};
