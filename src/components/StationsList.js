import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger'
import {Text,View,StyleSheet,TouchableHighlight} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ListItemArrowForward } from './AIcons'

const style = StyleSheet.create({
	list:{
		flex:1,
	},
	listItem:{
		borderWidth:1,
		borderColor:'lightgray',
		borderRadius:4,
		// margin:2,
		marginBottom:2,
		backgroundColor:'whitesmoke',
	},
	container:{
		margin:5,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		
	},
	container__header:{
		fontSize:16,
	},
	container__address:{
		fontSize:10,
		color:'gray',
	},
});

function StationsList({items,onStation}) {

	return (
		<View style={style.list}>
			<FlatList
				data={items}
				renderItem={({item}) => (
						<TouchableHighlight
							style={style.listItem}
							underlayColor='lightgray'
							onPress={() => onStation(item)}>
							<View style={style.container}>
								<View>
									<Text style={style.container__header}>{item.name}</Text>
									<Text style={style.container__address}>{item.address}, {item.city}</Text>
								</View>
								{ListItemArrowForward()}
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

