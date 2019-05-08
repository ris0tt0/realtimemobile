import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './screens/home/'
import TripPlannerScreen from './screens/planner/'
import StationScreen from './screens/station/'
import LocationScreen from './screens/location/'
import LocationDetails from './screens/locationdetails/'
import PlannerDetailsScreen from './screens/plannerdetails/'
import PlannerResultsScreen from './screens/plannerresults/'
import AdvisoryScreen from './screens/advisory/'
import { TabBarIcon } from './components/AIcons'
import { Platform } from 'expo-core'
import React from 'react'
import store from './store'
import Logger from 'js-logger'
import { fetchServiceAdvisory, fetchElevatorInfo } from './actions';

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
	PlannerResults:PlannerResultsScreen,
	PlannerDetails:PlannerDetailsScreen,
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
				? 'ios-train'
				: 'md-train'
			}
		/>
	),
};

const AdvisoryStack = createStackNavigator({
	Advisory:AdvisoryScreen,
});

AdvisoryStack.navigationOptions = {

	tabBarLabel:'Advisory',
	tabBarIcon:({focused}) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios'
				? 'ios-alert'
				: 'md-alert'
			}
		/>
	),
	tabBarOnPress:({navigation,defaultHandler}) => {
		/**
		 * TODO need flag to determine if we are in flight
		 * to prevent additinal api calls.
		 */
		store.dispatch(fetchServiceAdvisory());
		store.dispatch(fetchElevatorInfo());

		defaultHandler();
	},
}

export default createBottomTabNavigator({
	HomeStack,
	StationStack,
	TripPlannerStack,
	AdvisoryStack,
})