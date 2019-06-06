import PropTypes from 'prop-types'
import Colors from '../constants/Colors'
import React from 'react'
import {View} from 'react-native'
import { Platform } from 'expo-core'
import {Foundation,Ionicons,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'

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

function SearchBarIcon(){
	return(
		<Ionicons 
				style={{padding:5}}
				name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
				size={20}
				color="#000"/>
	)
}

function ListItemArrowForward()
{
	return(
		<Ionicons
			name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-search'}
			size={20}
			color="gray" />
	)
}

function StationRefresh()
{
	return(
		<View style={{paddingLeft:5}}>
			<Ionicons
				name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
				size={20}
				color={Colors.tintColor}
			/>
		</View>
	)
}

function StationInfo()
{
	return(
		<View style={{paddingLeft:5}}>
			<Ionicons
				name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
				size={20}
				color={Colors.tintColor}
			/>
		</View>
	)
}

function StationSwap()
{
	return(
		<MaterialIcons
			name='swap-vert'
			size={25}
			color='black'
		/>
	)
}

function StationLocation()
{
	return(
		<MaterialIcons
			name='my-location'	
			size={25}
			color='black'
		/>
	)
}

function Timelapse({size=25})
{
	return(
		<MaterialCommunityIcons
			name='timelapse'
			size={size}
			color='gray'
		/>
	)
}

function PlannerMoney()
{
	return(
		<Foundation
			name='dollar-bill'
			size={25}
			color='gray'
		/>
	)
}

function PlannerMap()
{
	return(
		<MaterialCommunityIcons
			name='map-search-outline'
			size={25}
			color='gray'
		/>
	)
}

function PlannerForwardArrow()
{
	return(
		<Ionicons
			name={Platform.OS === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-round-forward'}
			size={20}
			color='black'
		/>
	)
}

function PlannerDownArrow()
{
	return(
		<View>
			<Ionicons
				name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
				size={20}
				color='black'
			/>
		</View>
	)
}

export {
	ListItemArrowForward,
	PlannerMoney,
	PlannerMap,
	PlannerForwardArrow,
	PlannerDownArrow,
	SearchBarIcon,
	TabBarIcon,
	RouteLineArrows,
	RouteLineDetailBike,
	StationInfo,
	StationRefresh,
	StationSwap,
	StationLocation,
	Timelapse,
};
