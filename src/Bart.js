import React from 'react'
import PropTypes from 'prop-types'
import {Text,View} from 'react-native'
import Logger from 'js-logger'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Homescreen from './components/homescreen';

const RootStack = createStackNavigator({
	home: {
		screen:Homescreen,
		
	},
  // Counter: CounterContainer,
  // StaticCounter: StaticCounterContainer,
});

const Navigation = createAppContainer(RootStack);

function Bart(props) {
	return <Navigation />
	// return (<View><Text>Bart Instance</Text></View>);
}

Bart.propTypes = {

}

export default Bart;

