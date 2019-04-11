import React from 'react'
import PropTypes from 'prop-types'
import {Button,Text,View,Picker} from 'react-native'
import Logger from 'js-logger'

let staterrere = '';

function Departure({isFetching,routes,onRoutes,stations,onTrainCount,onRTE}) {
	
	Logger.info(stations);

	let picker = <View />;

	if(stations.length > 0)
	{
		// const items = stations.map((station,index) => <Picker.Item key={index} label={station.name} value={station.abbr} />)

		// picker = (
		// 	<Picker
		// 		selectedValue={staterrere}
		// 		style={{height: 100, width: '100%',}}
		// 		onValueChange={(itemValue, itemIndex) =>
		// 		{
		// 			staterrere = itemValue;
		// 			Logger.info(`${itemValue} ${itemIndex}`);
		// 		}} >
		// 			{items}
		// 	</Picker>);
	}

	return (
		<View>
			<Text>is fetching: {isFetching ? 'true' : 'false'}</Text>	
			<Text>Departure</Text>
			<Button onPress={onRoutes} title='fetch routes' />
			{/* <Button onPress={onStations} title='fetch stations' /> */}
			<Button onPress={onTrainCount} title='fetch traincount' />
			<Button onPress={() => onRTE('16TH')} title='fetch 16th' />
			{picker}
			
		</View>
	)
}

Departure.propTypes = {
	
}

export default Departure;