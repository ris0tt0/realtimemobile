import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Picker,View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Logger from 'js-logger'
import Colors from '../../constants/Colors'
import {StationLocation,StationSwap} from '../../components/AIcons'

const START = 'start';
const END = 'end';
const LABEL_DEFAULT = 'Select Station';

export class PlannerIOS extends Component {
	static propTypes = {
		stations:PropTypes.array,
		closestStation:PropTypes.object,
		onSearch:PropTypes.func.isRequired,
		onLocation:PropTypes.func.isRequired,
	}

	constructor(props)
	{
		super(props);

		const {stations} = this.props;
		const items = stations.map((station,index) => <Picker.Item label={station.name} value={station.abbr} key={index}></Picker.Item>)
		items.unshift(<Picker.Item label={LABEL_DEFAULT} value={LABEL_DEFAULT} key={LABEL_DEFAULT} />);

		const stationName = new Map();
		stationName.set(LABEL_DEFAULT,LABEL_DEFAULT);
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

	onSwapStations = () =>
	{
		const {startAbbr,endAbbr} = this.state;

		this.setState({startAbbr:endAbbr,endAbbr:startAbbr});
	}
	onStationLocation = () =>
	{
		const {onLocation} = this.props;
		
		onLocation();
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
		const {closestStation} = this.props;

		Logger.info(closestStation);

		const {active,startAbbr,endAbbr,items} = this.state;
		// Logger.info(`active: ${active} startAbbr:${startAbbr} endAbbr:${endAbbr}`);
		return(
			<View style={style.container}>
				<Text style={style.title}>Trip Planner</Text>
				<View style={{paddingTop:10}}>
					<View style={style.stationContainer}>
						<Text>A</Text>
						<View style={active === START ? style.selectedStation : style.station }>
							<Text
								style={active === START ? style.selectedStationText : style.stationText}
								onPress={()=>this.onTextClick(START)}
								>{this.getTextLabel(startAbbr)}</Text>
						</View>
						<TouchableOpacity onPress={this.onStationLocation}>
							<StationLocation />
						</TouchableOpacity>
					</View>
					<View style={style.stationContainer}>
						<Text>B</Text>
						<View style={active === END ? style.selectedStation : style.station }>
							<Text
								style={active === END ? style.selectedStationText : style.stationText}
								onPress={()=>this.onTextClick(END)}
							>{this.getTextLabel(endAbbr)}</Text>
						</View>
						<TouchableOpacity onPress={this.onSwapStations}>
							<StationSwap />
						</TouchableOpacity>
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
			</View>
		);
	}
}

const style = StyleSheet.create({
	container:{
		flex:1,
	},
	title:{
		fontSize:18,
		fontWeight:'bold',
		color:'white',
		padding:10,
		backgroundColor:Colors.bartBlue,
	},
	stationContainer:{
		// borderColor:'black',
		// borderWidth:1,
		alignItems:'center',
		justifyContent:'space-between',
		flexDirection:'row',
		paddingLeft:10,
		paddingRight:10,
	},
	station:{
		flex:1,
		marginLeft:10,
		marginRight:10,
		margin:5,
		padding:5,
		borderRadius:4,
		borderColor:'gray',
		borderWidth:1,
	},
	selectedStation:{
		flex:1,
		marginLeft:10,
		marginRight:10,
		margin:5,
		padding:5,
		borderRadius:4,
		borderColor:Colors.bartBlue,
		borderWidth:1,
	},
	stationText:{
		color:'lightgray',
	},
	selectedStationText:{
		color:Colors.bartBlue,
	},
	picker:{
		marginLeft:20,
		marginRight:20,
		margin:5,
	}
});

export default PlannerIOS
