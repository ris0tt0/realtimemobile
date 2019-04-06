import React from 'react';
import {View,Text} from 'react-native'
import Logger from 'js-logger'
import store from './src/store'
import {Provider} from 'react-redux'
import Bart from './src/BartContainer'

export default class App extends React.Component {

	constructor(props){
		super(props);

		Logger.useDefaults();		
	}

	render(){
		return <Provider store={store} ><Bart /></Provider>
		// return <View><Text>test app</Text></View>
  }
}
