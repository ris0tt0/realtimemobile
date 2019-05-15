import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Picker,View,Text,StyleSheet} from 'react-native'
import Logger from 'js-logger'

const START = 'start';
const END = 'end';
const LABEL_DEFAULT = 'Select Station';

export class PlannerIOS extends Component {
	static propTypes = {
		stations:PropTypes.array,
		onSearch:PropTypes.func.isRequired,
	}

	constructor(props)
	{
		super(props);

		const {stations} = this.props;
		const items = stations.map((station,index) => <Picker.Item label={station.name} value={station.abbr} key={index}></Picker.Item>)
		items.unshift(<Picker.Item label={LABEL_DEFAULT} value={LABEL_DEFAULT} key={LABEL_DEFAULT} />);

		const stationName = new Map();
		stations.forEach(station => stationName.set(station.abbr,station.name));

		this.state = {
			active:'',
			startAbbr:LABEL_DEFAULT,
			endAbbr:LABEL_DEFAULT,
			items,
			stationName,
		};
	}

	onTextClick(selected)
	{
		this.setState({active:selected});
	}

	getTextLabel(abbr)
	{
		const {stationName} = this.state;
		return stationName.get(abbr);
	}

	isSubmitButtonDisabled()
	{
		const {startAbbr,endAbbr} = this.state;

		return !(
			startAbbr !== LABEL_DEFAULT && 
			endAbbr !== LABEL_DEFAULT && 
			startAbbr !== endAbbr);
	}

	onSubmit = () =>
	{
		const {onSearch,navigation:{navigate}} = this.props;
		const {startAbbr,endAbbr} = this.state;

		navigate('PlannerResults');
		onSearch(startAbbr,endAbbr);
	}

	onPickerSelected = (value) =>
	{
		this.setState({[`${this.state.active}Abbr`]:value})
	}

	render()
	{
		const {active,startAbbr,endAbbr,items} = this.state;

		Logger.info(`active: ${active} startAbbr:${startAbbr} endAbbr:${endAbbr}`);

		return(
			<View style={style.container}>
				<View style={active === START ? style.selectedStation : style.station }>
					<Text
						style={style.stationText}
						onPress={()=>this.onTextClick(START)}
						>{this.getTextLabel(startAbbr)}</Text>
				</View>
				<View style={active === END ? style.selectedStation : style.station }>
					<Text
						style={style.stationText}
						onPress={()=>this.onTextClick(END)}
					>{this.getTextLabel(endAbbr)}</Text>
				</View>
				<View>
					<Button
						title='Search Routes'
						disabled={this.isSubmitButtonDisabled()}
						onPress={this.onSubmit}
					/>
				</View>
					{active === '' ? null :
					<View>
						<Picker
							style={style.picker}
							selectedValue={this.state[`${active}Abbr`]}
							onValueChange={this.onPickerSelected}
						>{items}</Picker>
					</View>}
				</View>
		);
	}
}

const style = StyleSheet.create({
	container:{
		flex:1,
	},
	station:{
		marginLeft:20,
		marginRight:20,
		margin:5,
		padding:5,
		borderRadius:4,
		borderColor:'gray',
		borderWidth:1,
	},
	selectedStation:{
		marginLeft:20,
		marginRight:20,
		margin:5,
		padding:5,
		borderRadius:4,
		borderColor:'blue',
		borderWidth:1,
	},
	stationText:{
		color:'lightgray',
	},
	picker:{
		marginLeft:20,
		marginRight:20,
		margin:5,
	}
});

export default PlannerIOS
