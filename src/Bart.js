import React from 'react'
import PropTypes from 'prop-types'
import {Text,View} from 'react-native'
import Logger from 'js-logger'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Homescreen from './components/homescreen';

import Departure from './components/departure/'
import Planner from './components/planner/'
import Station from './components/station/'


const RootStack = createStackNavigator({
	home: {
		screen:Homescreen,
	},
});

const RootBottomTab =  createBottomTabNavigator({
	departure:{screen:Departure},
	planner:{screen:Planner},
	station:{screen:Station},
});

// const Navigation = createAppContainer(RootStack);
const Navigation = createAppContainer(RootBottomTab);

function Bart(props) {
	return <Navigation />
}

Bart.propTypes = {

}

export default Bart;

