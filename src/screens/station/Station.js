import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Logger from 'js-logger'
import {StationSearchInput} from '../../components/StationSearchInput'
import {StationsList} from '../../components/StationsList'

/**
 * Used to display the avaiable BART stations.
 * 
 */
class Station extends Component {
	constructor(props)
	{
		super(props);
		
		this.state = {stations:props.stations.concat()};
		const {navigation:{navigate},onStationSelect} = this.props;
		
		this.onStation = item =>{
			onStationSelect(item.abbr);
			navigate('Location',{name:item.name});
		}
	}

	onInputText = text =>
	{
		const stations = this.props.stations.filter(station => station.name.search(text) > -1 );
		this.setState({stations})
	};

	render() {


		return (
			<View style={{flex:1, margin:10}}>
				<StationSearchInput onText={this.onInputText}></StationSearchInput>
				<StationsList items={this.state.stations} onStation={this.onStation}></StationsList>
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

