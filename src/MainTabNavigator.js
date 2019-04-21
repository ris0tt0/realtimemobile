import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './screens/home/'
import TripPlannerScreen from './screens/planner/'
import StationScreen from './screens/station/'
import LocationScreen from './screens/location/'
import LocationDetails from './screens/locationdetails/'
import { TabBarIcon } from './components/TabBarIcon'
import { Platform } from 'expo-core'
import React from 'react'

const HomeStack = createStackNavigator({
	Home:HomeScreen,
});

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({focused}) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios'
				? 'ios-home'
				: 'md-home'
			}
		/>
	),
};

const TripPlannerStack = createStackNavigator({
	TripPlanner:TripPlannerScreen,
});

TripPlannerStack.navigationOptions = {
	tabBarLabel: 'Planner',
	tabBarIcon: ({focused}) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios'
				? 'ios-walk'
				: 'md-walk'
			}
		/>
	),
};

const StationStack = createStackNavigator({
	Station:StationScreen,
	Location:LocationScreen,
	LocationDetails,
});

StationStack.navigationOptions = {
	tabBarLabel: 'Station',
	tabBarIcon: ({focused}) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios'
				? `ios-train` 
				: 'md-train'
			}
		/>
	),
};

export default createBottomTabNavigator({
	HomeStack,
	StationStack,
	TripPlannerStack,
})