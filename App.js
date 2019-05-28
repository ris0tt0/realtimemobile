import React from 'react';
import {View} from 'react-native'
import Logger from 'js-logger'
import store from './src/store'
import {Provider} from 'react-redux'
import AppNavigator from './src/AppNavigator'
import { fetchStations } from './src/actions';

export default class App extends React.Component {

	constructor(props){
		super(props);

		Logger.useDefaults();		
	}

	componentDidMount()
	{
		store.dispatch(fetchStations());
	}

	render(){
		return <Provider store={store} ><AppNavigator style={{flex:1}} /></Provider>;
  }
}
