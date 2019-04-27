import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Picker,View,Text} from 'react-native'
import Logger from 'js-logger'

const selectStationID = 'selectstations';
const originTitleDefault = 'select origin station';
const destinationTitleDefault = 'select destination station';

export class PlannerIOS extends Component {
	static propTypes = {
		stations:PropTypes.array,
		onSearch:PropTypes.func.isRequired,
	}

	constructor(props)
	{
		super(props);

		this.state = {
			originAbbr:selectStationID,
			destinationAbbr:selectStationID,
			originTitle:originTitleDefault,
			destinationTitle:destinationTitleDefault,
			currentButton:null,
			currentLabel:null,
		};

		const {onSearch,navigation:{navigate}} = this.props;
		
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
		const {originTitle,destinationTitle,originAbbr,destinationAbbr,currentButton,currentLabel} = this.state;
		const items = stations.map((station,index) => <Picker.Item label={station.name} value={station.abbr} key={index}></Picker.Item>)

		items.unshift(<Picker.Item label='select station' value={selectStationID} key={selectStationID} />);

		const enableSearchButton = !(originAbbr !== selectStationID && destinationAbbr !== selectStationID)

		return (
			<View style={{margin:10,backgroundColor:'white'}}>
				<Text>select stations and stuff</Text>
				<Button
					title={originTitle} 
					onPress={()=>this.setState({currentButton:'originAbbr',currentLabel:'originTitle'})}
				/>
				<Button
					title={destinationTitle}
					onPress={()=>this.setState({currentButton:'destinationAbbr',currentLabel:'destinationTitle'})}
				/>
				<Button disabled={enableSearchButton} title='Search'
					onPress={()=>this.onTripPlanning()}
				/>

				{ currentButton != null ? <Picker
					selectedValue={this.state[currentButton]}
					// style={{backgroundColor:'pink',height:30,width:400}}
					onValueChange={(itemValue,itemIndex) => this.setState({[currentButton]:itemValue,[currentLabel]:items[itemIndex].props.label})}
				>{items}</Picker> : <View />}
			</View>
		)
	}
}

export default PlannerIOS
