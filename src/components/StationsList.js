import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger'
import {Text,View,TouchableHighlight} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import style from './styles'

function StationsList({items,onStation}) {

	return (
		<View style={style.StationsList}>
			<FlatList
				data={items}
				renderItem={({item}) => (
						<TouchableHighlight
							underlayColor='black'
							onPress={() => onStation(item.abbr)}>
							<View style={style.StationsList__renderItem}>
								<Text>{item.name}</Text>
							</View>
						</TouchableHighlight>
					)}
				keyExtractor={(item,index) => `${item.abbr}-${index}`}
			 ></FlatList>
		</View>
	)
}

StationsList.propTypes = {
	items:PropTypes.arrayOf(PropTypes.shape({
		abbr:PropTypes.string.isRequired,
		address:PropTypes.string.isRequired,
		city:PropTypes.string.isRequired,
		county:PropTypes.string.isRequired,
		gtfs_latitude:PropTypes.string.isRequired,
		gtfs_longitude:PropTypes.string.isRequired,
		name:PropTypes.string.isRequired,
		state:PropTypes.string.isRequired,
		zipcode:PropTypes.string.isRequired,
	})),
}

export {StationsList}

