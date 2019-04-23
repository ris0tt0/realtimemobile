import React from 'react'
import PropTypes from 'prop-types'
import {FlatList,View,Text} from 'react-native'
import Logger from 'js-logger'
import {WaitingScreen} from '../../components/'
import { ResultRenderItem } from '../../components/PlannerRenderers';

function PlannerResults({isFetching,originStation,destinationStation,schedule,trip}) {

	if(isFetching) return <WaitingScreen />

	return (
		<View>
			<View>
				<Text>{originStation.name}</Text>
				<Text>{destinationStation.name}</Text>
			</View>
			<View>
				<Text>{schedule.date} {schedule.time}</Text>
			</View>
			<FlatList
				data={trip}
				renderItem={ResultRenderItem}
			/>
		</View>
	)
}

PlannerResults.propTypes = {

}

export {PlannerResults}

