import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import DepartureScreen from './screens/departure'
import TripPlannerScreen from './screens/planner/'
import StationScreen from './screens/station/'
import { TabBarIcon } from './components/TabBarIcon'
import { Platform } from 'expo-core'
import React from 'react'

const DepartureStack = createStackNavigator({
	Departure:DepartureScreen,
});

DepartureStack.navigationOptions = {
	tabBarLabel: 'Departure',
	tabBarIcon: ({focused}) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios'
				? `ios-information-circle${focused ? '' : '-outline'}` 
				: 'md-information-circle'
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
				? `ios-information-circle${focused ? '' : '-outline'}` 
				: 'md-information-circle'
			}
		/>
	),
};

const StationStack = createStackNavigator({
	Station:StationScreen,
});

StationStack.navigationOptions = {
	tabBarLabel: 'Station',
	tabBarIcon: ({focused}) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios'
				? `ios-information-circle${focused ? '' : '-outline'}` 
				: 'md-information-circle'
			}
		/>
	),
};

export default createBottomTabNavigator({
	DepartureStack,
	TripPlannerStack,
	StationStack,
})