import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Button, View,Text, TextInput} from 'react-native'
import Logger from 'js-logger'
import {StationSearchInput} from '../../components/StationSearchInput'
import {StationsList} from '../../components/StationsList'

/**
 * Used to display the avaiable BART stations.
 * 
 */
// function Station({isFetching,stations,onStationSelect}) {
// 	return (
// 		<View>
// 			<StationSearchInput onText={text => Logger.info(`station search ${text}`)}></StationSearchInput>
// 			<StationsList items={stations}></StationsList>
// 		</View>
// 	)
// }

class Station extends Component {
	constructor(props)
	{
		super(props);
		this.state = {stations:props.stations.concat()}
	}

	onInputText = text =>
	{
		Logger.info(`onInputText: ${text} ${this.state.stations.length}`);

		const stations = this.props.stations.filter(station => station.name.search(new RegExp(`${text}`)) > 0 );

		this.setState({stations})
	};

	render() {

		const {isFetching,stations,onStationSelect} = this.props;

		return (
			<View>
				<StationSearchInput onText={this.onInputText}></StationSearchInput>
				<StationsList items={this.state.stations}></StationsList>
			</View>
		)
	}
}

Station.propTypes = {
	stations:PropTypes.arrayOf(PropTypes.shape({
		abbr:PropTypes.string.isRequired,
		address:PropTypes.string.isRequired,
		city:PropTypes.string.isRequired,
		county:PropTypes.string.isRequired,
		gtfs_latitude:PropTypes.string.isRequired,
		gtfs_longitude:PropTypes.string.isRequired,
		name:PropTypes.string.isRequired,
		state:PropTypes.string.isRequired,
		zipcode:PropTypes.string.isRequired,
	})).isRequired,
	isFetching:PropTypes.bool.isRequired,
	onStationSelect:PropTypes.func.isRequired,
}

export default Station

