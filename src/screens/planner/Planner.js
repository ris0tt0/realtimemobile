import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Picker,View,Text} from 'react-native'
import Logger from 'js-logger'

const selectStationID = 'selectstations';

export default class Planner extends Component {
	static propTypes = {
		prop: PropTypes
	}

	constructor(props)
	{
		super(props);
		this.state = {originAbbr:selectStationID,destinationAbbr:selectStationID};

		const {navigation:{navigate}} = this.props;
		const {onSearch} = props;
		this.onTripPlanning = () =>
		{
				const {originAbbr,destinationAbbr} = this.state;

				if( originAbbr !== selectStationID && destinationAbbr !== selectStationID && originAbbr !== destinationAbbr)
				{
					navigate('PlannerResults');
					onSearch(originAbbr,destinationAbbr);
				}
		};
	}

	render() {

		const {stations} = this.props;
		const items = stations.map((station,index) => <Picker.Item label={station.name} value={station.abbr} key={index}></Picker.Item>)

		items.unshift(<Picker.Item label='select station' value={selectStationID} key={selectStationID} />);

		return (
			<View>
				<Text>Planner</Text>
				<Text>Please choose an origin and a destination to search for trips.</Text>
				<Picker
					selectedValue={this.state.originAbbr}
					style={{backgroundColor:'pink', height:30,width:400}}
					onValueChange={(itemValue,itemIndex) => this.setState({originAbbr:itemValue})}
				>{items}</Picker>
				<Picker
					selectedValue={this.state.destinationAbbr}
					style={{backgroundColor:'pink',height:30,width:400}}
					onValueChange={(itemValue,itemIndex) => this.setState({destinationAbbr:itemValue})}
				>{items}</Picker>
				<Button title='search' onPress={() => this.onTripPlanning() }/>
			</View>
		)
	}
}
