import React from 'react'
import {Platform} from 'react-native'
import PropTypes from 'prop-types'
import {Button, DatePickerIOS, DatePickerAndroid, Picker,View,Text,StyleSheet,TimePickerAndroid,TouchableOpacity} from 'react-native'
import Logger from 'js-logger'
import Colors from '../../constants/Colors'
import {StationLocation,StationSwap, PlannerDownArrow, PlannerUpArrow} from '../../components/AIcons'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { getDateLabel,getDateLabelSimple } from '../../Utils';
import { WaitingScreen } from '../../components';

const isIOS = Platform.OS === 'ios';

const TEN_DAYS_MS = 864000000;
const EIGHT_WEEKS_MS = 4838360000;

const START = 'start';
const END = 'end';
const DATE = 'date';
const LABEL_DEFAULT = 'Select Station';
const ARRIVE = 'Arrive';
const DEPART = 'Depart';
const DATEBYLIST = [DEPART,ARRIVE];

class Planner extends React.Component {
	static propTypes = {
		isClosestStationFetching:PropTypes.bool.isRequired,
		stations:PropTypes.array.isRequired,
		closestStation:PropTypes.object.isRequired,
		onSearch:PropTypes.func.isRequired,
		onLocation:PropTypes.func.isRequired,
		clearClosestStation:PropTypes.func.isRequired,
		navigation:PropTypes.object.isRequired,
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
		// Logger.info('ctor')
		// Logger.info(this.state);
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
		const dateLabel = date instanceof Date ? Platform.OS === 'android' ? getDateLabelSimple(date) : getDateLabel(date) : date;

		const mindate = new Date(Date.now() - TEN_DAYS_MS);
		const maxdate = new Date(Date.now() + EIGHT_WEEKS_MS);
		
		return {dateLabel,mindate,maxdate};
	};

	setStartAbbr = startAbbr => this.setState({startAbbr});
	setEndAbbr = endAbbr => this.setState({endAbbr});
	setActive = active => this.setState({active});

	async showAndroidDatePicker(mindate,maxdate){
		// Logger.info(`mindate:${mindate} maxdate:${maxdate} ----${this.state}`);
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

	componentDidUpdate(){
		const {closestStation,clearClosestStation} = this.props;

		if( closestStation.hasOwnProperty('abbr'))
		{
			clearClosestStation();
			this.setStartAbbr(closestStation.abbr);
		}
	}

	render()
	{
		const { isClosestStationFetching } =this.props;
		const { active,date,startAbbr,endAbbr,items,datebyIndex,dateLabel,mindate,maxdate} = this.state;

		if( isClosestStationFetching) return <WaitingScreen title='locating' />;

		// Logger.info('render')
		// Logger.info(date);

		return(
			<View style={style.container}>
				<View style={{flex:1,paddingTop:10}}>
					<ChooseStationsComponent 
						active={active}
						endAbbr={endAbbr}
						getTextLabel={this.getTextLabel}
						items={items}
						key='choose station'
						onStationLocation={this.onStationLocation}
						onSwapStations={this.onSwapStations}
						onTextClick={this.onTextClick}
						setEndAbbr={this.setEndAbbr}
						setStartAbbr={this.setStartAbbr}
						startAbbr={startAbbr}
					/>
					<ChooseDateComponent 
						active={active}
						date={date}
						dateLabel={dateLabel}
						datebyIndex={datebyIndex}
						handleIndexChange={this.handleIndexChange}
						key='choose date'
						maxdate={maxdate}
						mindate={mindate}
						setActive={this.setActive}
						setDate={this.setDate}
						showAndroidDatePicker={(min,max)=>this.showAndroidDatePicker(min,max)}
						showAndroidTimePicker={()=>this.showAndroidTimePicker()}
					/>

					<View style={{
								flex:1,marginLeft:30,marginRight:46}}>
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
	chooseStationContainer:{
		// flex:1,
		justifyContent:'flex-start',
		// borderRadius:4,
		// borderColor:'gray',
		// borderWidth:1,
	},
	chooseDateContainer:{
		borderRadius:4,
		borderColor:'gray',
		borderWidth:1,
	},
	stationSelectionContainer:{
		// flex:1,
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
	dateSelected:{fontSize:18,borderColor:'black',borderWidth:1},
	chooseDateComponentContainer:{
		// flex:1,
		// justifyContent:'flex-start',
		marginLeft:30,
		marginRight:46,
		// borderRadius:4,
		// borderColor:'red',
		// borderWidth:1,
	},
	chooseDateLabelContainer:{
		// flex:4,
		marginTop:10,
		marginBottom:10,
		// borderRadius:4,
		// borderColor:'purple',
		// borderWidth:1,
	},
	chooseDateLabel:{
		marginRight:15,
		textDecorationLine:'underline',
		// borderRadius:4,
		// borderColor:'blue',
		// borderWidth:1,
	},
	chooseDateNowLabel:{
		textDecorationLine:'underline',
		// borderRadius:4,
		// borderColor:'yellow',
		// borderWidth:1,
	},

	chooseDateSegmentedControlContainer:{
		alignItems:'center',
		// borderRadius:4,
		// borderColor:'black',
		// borderWidth:1,
	},
	chooseDatePressControlsContainer:{
		// borderRadius:4,
		// borderColor:'gray',
		// borderWidth:1,
		// flex:1,
		marginTop:10,
		marginBottom:30,
		flexDirection:'row',
		justifyContent:'space-evenly'
	}
});

function ChooseStationsComponent({active,startAbbr,items,endAbbr,onTextClick,getTextLabel,setStartAbbr,setEndAbbr,onSwapStations,onStationLocation}) {
	return (
		<View style={style.chooseStationContainer}>
			<View style={style.stationSelectionContainer}>
				<Text>A</Text>
				<View style={active === START ? style.selectedStation : style.station }>
				{isIOS ?
				<Text
					style={active === START ? style.selectedStationText : style.stationText}
					onPress={()=>onTextClick(START)}
					>{getTextLabel(startAbbr)}</Text> : 
				<Picker
					selectedValue={startAbbr}
					onValueChange={setStartAbbr}
				>{items}</Picker>}
			</View>
			<TouchableOpacity onPress={onStationLocation}>
				<StationLocation />
			</TouchableOpacity>
		</View>
		<View style={style.stationSelectionContainer}>
			<Text>B</Text>
			<View style={active === END ? style.selectedStation : style.station }>
				{isIOS ?
				<Text
					style={active === END ? style.selectedStationText : style.stationText}
					onPress={()=>onTextClick(END)}
					>{getTextLabel(endAbbr)}</Text> :
				<Picker
					selectedValue={endAbbr}
					onValueChange={setEndAbbr}
					>{items}</Picker>}
			</View>
			<TouchableOpacity onPress={onSwapStations}>
				<StationSwap />
			</TouchableOpacity>
		</View>
	</View>
	);
}

ChooseStationsComponent.propTypes = {
	active:PropTypes.string.isRequired,
	startAbbr:PropTypes.string.isRequired,
	items:PropTypes.array.isRequired,
	endAbbr:PropTypes.string.isRequired,
	onTextClick:PropTypes.func.isRequired,
	getTextLabel:PropTypes.func.isRequired,
	setStartAbbr:PropTypes.func.isRequired,
	setEndAbbr:PropTypes.func.isRequired,
	onSwapStations:PropTypes.func.isRequired,
	onStationLocation:PropTypes.func.isRequired,
}

function ChooseDateComponent({active,datebyIndex,dateLabel,date,mindate,maxdate,setActive,setDate,handleIndexChange,showAndroidDatePicker,showAndroidTimePicker}) {
	return (
		<View style={style.chooseDateComponentContainer}>

			<View style={style.chooseDateLabelContainer}>
				<TouchableOpacity
					style={{flexDirection:'row',alignItems:'center'}}
					onPress={() => setActive(active === DATE ? '' : DATE)}
				>
					<Text style={style.chooseDateLabel}>{DATEBYLIST[datebyIndex]} {dateLabel}</Text>
					{active === DATE ?
						<PlannerUpArrow /> :
						<PlannerDownArrow />}
					{date instanceof Date ? 
						<View style={{marginLeft:10 }}>
							<Text style={style.chooseDateNowLabel} onPress={()=>setDate('Now')}>NOW</Text>
						</View> : 
						null}
				</TouchableOpacity>
			</View>

			{active === DATE ?
			<View>
				<View style={style.chooseDateSegmentedControlContainer}>
					<SegmentedControlTab
							values={DATEBYLIST}
							selectedIndex={datebyIndex}
							onTabPress={handleIndexChange}
					/>
				</View>

				{ isIOS ?
				<View>
					<DatePickerIOS 
						date={date instanceof Date ? date : new Date()}
						onDateChange={setDate}
						minimumDate={mindate}
						maximumDate={maxdate}
					/>
				</View> :
				<View style={style.chooseDatePressControlsContainer}>
					<View style={{flex:1,marginRight:5}}><Button onPress={() => showAndroidDatePicker(mindate,maxdate)} title='select date' /></View>
					<View  style={{flex:1,marginLeft:5}}><Button onPress={() => showAndroidTimePicker()} title='select time' /></View>
				</View> }
		</View> : null}
	</View>
	);
}

ChooseDateComponent.propTypes = {
	active:PropTypes.string.isRequired,
	datebyIndex:PropTypes.number.isRequired,
	dateLabel:PropTypes.string.isRequired,
	date:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	mindate:PropTypes.object.isRequired,
	maxdate:PropTypes.object.isRequired,
	setActive:PropTypes.func.isRequired,
	setDate:PropTypes.func.isRequired,
	handleIndexChange:PropTypes.func.isRequired,
	showAndroidDatePicker:PropTypes.func.isRequired,
	showAndroidTimePicker:PropTypes.func.isRequired,
}


export default Planner
