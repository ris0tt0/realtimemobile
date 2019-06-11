import React,{Component} from 'react'
import {Platform} from 'react-native'
import PropTypes from 'prop-types'
import {Button, DatePickerIOS, DatePickerAndroid, Picker,View,Text,StyleSheet,TimePickerAndroid,TouchableOpacity} from 'react-native'
import Logger from 'js-logger'
import Colors from '../../constants/Colors'
import {StationLocation,StationSwap, PlannerDownArrow, PlannerUpArrow} from '../../components/AIcons'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { getDateLabel } from '../../Utils';

const TEN_DAYS_MS = 864000000;
const EIGHT_WEEKS_MS = 4838360000;

const START = 'start';
const END = 'end';
const DATE = 'date';
const LABEL_DEFAULT = 'Select Station';
const ARRIVE = 'Arrive';
const DEPART = 'Depart';
const DATEBYLIST = [DEPART,ARRIVE];

class Planner extends Component {
	static propTypes = {
		stations:PropTypes.array,
		closestStation:PropTypes.object,
		onSearch:PropTypes.func.isRequired,
		onLocation:PropTypes.func.isRequired,
		clearClosestStation:PropTypes.func.isRequired,
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

		const p = this.getDateStateProps('Now');
		this.state = {
			active:'',
			startAbbr:LABEL_DEFAULT,
			endAbbr:LABEL_DEFAULT,
			items,
			stationName,
			date:'Now',
			datebyIndex:0,
			...p,
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
		const {startAbbr,endAbbr,datebyIndex,date} = this.state;

		this.setState({active:''});

		navigate('PlannerResults',{name:`${startAbbr} - ${endAbbr}`});

		onSearch(startAbbr,endAbbr,DATEBYLIST[datebyIndex].toLowerCase(),date);
	}

	onPickerSelected = value => this.setState({[`${this.state.active}Abbr`]:value});
	handleIndexChange = index => this.setState({datebyIndex:index});
	setDate = date => this.setState({date,...this.getDateStateProps(date)});

	getDateStateProps = date => {
		const dateLabel = date instanceof Date ? getDateLabel(date) : date;

		const mindate = new Date(Date.now() - TEN_DAYS_MS);
		const maxdate = new Date(Date.now() + EIGHT_WEEKS_MS);
		
		return {dateLabel,mindate,maxdate};
	};

	setStartAbbr = startAbbr => this.setState({startAbbr});
	setEndAbbr = endAbbr => this.setState({endAbbr});
	setActive = active => this.setState({active});

	async showAndroidDatePicker(mindate,maxdate){
		let {date} = this.state;
		date =  date instanceof Date ? date : new Date();

		try {
			const {action, year, month, day} = await DatePickerAndroid.open({
				date,
				mode:'spinner',
				maxDate:maxdate,
				minDate:mindate,
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				date.setFullYear(year,month,day);
				this.setDate(new Date(date))
			}
		} catch ({code, message}) {
			Logger.warn('Cannot open date picker', message);
		}
	}

	async showAndroidTimePicker(){
		let {date} = this.state;
		date =  date instanceof Date ? date : new Date();

		try {
			const {action, hour, minute} = await TimePickerAndroid.open({
				hour: date.getHours(),
				minute: date.getMinutes(),
				is24Hour: false, 
				mode:'spinner',
			});
			if (action !== TimePickerAndroid.dismissedAction) {
				date.setHours(hour,minute);
				this.setDate(new Date(date));
			}
		} catch ({code, message}) {
			Logger.warn('Cannot open time picker', message);
		}
	}

	componentDidUpdate(prevProps){
		const {closestStation,clearClosestStation} = this.props;

		if( closestStation.hasOwnProperty('abbr'))
		{
			clearClosestStation();
			this.setStartAbbr(closestStation.abbr);
		}
	}

	render()
	{
		const isIOS = Platform.OS === 'ios';
		const {active,date,startAbbr,endAbbr,items,datebyIndex,dateLabel,mindate,maxdate} = this.state;

		return(
			<View style={style.container}>
				<View style={{paddingTop:10}}>
					<View style={style.stationContainer}>
						<Text>A</Text>
						<View style={active === START ? style.selectedStation : style.station }>
							{isIOS ?
							<Text
								style={active === START ? style.selectedStationText : style.stationText}
								onPress={()=>this.onTextClick(START)}
								>{this.getTextLabel(startAbbr)}</Text> : 
							<Picker
								selectedValue={startAbbr}
								onValueChange={this.setStartAbbr}
							>{items}</Picker>}
						</View>
						<TouchableOpacity onPress={this.onStationLocation}>
							<StationLocation />
						</TouchableOpacity>
					</View>
					<View style={style.stationContainer}>
						<Text>B</Text>
						<View style={active === END ? style.selectedStation : style.station }>
							{isIOS ?
							<Text
								style={active === END ? style.selectedStationText : style.stationText}
								onPress={()=>this.onTextClick(END)}
								>{this.getTextLabel(endAbbr)}</Text> :
							<Picker
								selectedValue={endAbbr}
								onValueChange={this.setEndAbbr}
								>{items}</Picker>}
						</View>
						<TouchableOpacity onPress={this.onSwapStations}>
							<StationSwap />
						</TouchableOpacity>
					</View>

					<View style={{marginLeft:30,marginRight:46}}>
						<View style={{marginTop:10,marginBottom:10}}>
							<TouchableOpacity
								style={{flexDirection:'row',alignItems:'center'}}
								onPress={() => this.setActive(active === DATE ? '' : DATE)}
							>
								<Text style={{marginRight:15}}>{DATEBYLIST[datebyIndex]} {dateLabel}</Text>
								{active === DATE ?
									<PlannerUpArrow /> :
									<PlannerDownArrow />}
								{date instanceof Date ? 
									<View style={{marginLeft:10 }}>
										<Text onPress={()=>this.setDate('Now')}>Now</Text>
									</View> : 
									null}
							</TouchableOpacity>
						</View>
						{active === DATE ?
						<View>
							<View style={{alignItems:'center'}}>
								<SegmentedControlTab
										values={DATEBYLIST}
										selectedIndex={this.state.datebyIndex}
										onTabPress={this.handleIndexChange}
								/>
							</View>
							{ isIOS ?
							<View>
								<DatePickerIOS 
									date={date instanceof Date ? date : new Date()}
									onDateChange={this.setDate}
									minimumDate={mindate}
									maximumDate={maxdate}
								/>
							</View> :
							<View style={{marginTop:10,marginBottom:10,flexDirection:'row', justifyContent:'space-evenly'}}>
								<View ><Button onPress={() => this.showAndroidDatePicker(mindate,maxdate)} title='select date' /></View>
								<View ><Button onPress={() => this.showAndroidTimePicker()} title='select time' /></View>
							</View>
							}
						</View> : null}
					</View>

					<View style={{marginLeft:30,marginRight:46}}>
						<Button
							title='Search Routes'
							disabled={this.isSubmitButtonDisabled()}
							onPress={this.onSubmit}
						/>
					</View>
					{active === '' || active === DATE ? null :
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
	},
	date:{fontSize:18,borderColor:'black',borderWidth:1},
	dateSelected:{fontSize:18,borderColor:'black',borderWidth:1}
});

export default Planner
