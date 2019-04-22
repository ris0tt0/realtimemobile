import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Picker,View,Text} from 'react-native'
import Logger from 'js-logger'

export default class Planner extends Component {
	static propTypes = {
		prop: PropTypes
	}

	constructor(props)
	{
		super(props);

		Logger.info(props);
		
		this.state = {originAbbr:'',destinationAbbr:''};
	}

	render() {
		return (
			<View>
				<Text>Planner</Text>
				<Text>Please choose an origin and a destination to search for trips.</Text>
				<Picker
					selectedValue={this.state.originAbbr}
					style={{height:30,width:400}}
					onValueChange={(itemValue,itemIndex) => this.setState({originAbbr:itemValue})}
				></Picker>
				<Picker
					selectedValue={this.state.originAbbr}
					style={{height:30,width:400}}
					onValueChange={(itemValue,itemIndex) => this.setState({destinationAbbr:itemValue})}
				></Picker>
			</View>
		)
	}
}
