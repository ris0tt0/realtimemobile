import PropTypes from 'prop-types'
import Colors from '../constants/Colors'
import React from 'react'
import {View} from 'react-native'
import { Platform } from 'expo-core'
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons'

function TabBarIcon({name,focused}) {
	
	return	(
		<Ionicons
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
			<Ionicons
				name={Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'}
				size={13}
				color={color}
			/>
			<Ionicons
				name={Platform.OS === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-round-forward'}
				size={13}
				color={color}
			/>
		</View>
	)
}

RouteLineArrows.propTypes = {

}

function RouteLineDetailBike(){
	return (
		<View style={{paddingTop:3,paddingRight:5}}>
			<MaterialCommunityIcons
				name='bike'
				size={13}
			/>
		</View>
		);
}


export {TabBarIcon,RouteLineArrows,RouteLineDetailBike};
