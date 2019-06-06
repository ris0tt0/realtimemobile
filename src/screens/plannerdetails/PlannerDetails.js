import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger'
import {FlatList,StyleSheet, Text, View} from 'react-native'
import {
	TripTime,
	TripBar,
	TripDuration,
	TripChanges,
	TripFare,
	WaitingScreen, 
	TripLineBar} from '../../components';
import Colors from '../../constants/Colors';
import { PlannerForwardArrow, RouteLineDetailBike, Timelapse } from '../../components/AIcons';
import { getMinutes, getHoursMinutes } from '../../Utils';

function PlannerDetailsRenderItem({item}) {
  const {origin,destination,line} = item;

  return (
    <View style={styles.renderItemContainer}>
      <View style={{justifyContent:'space-between'}}>
        <Text style={{fontWeight:'bold'}}>{item.origTimeMin}</Text>
        <Text style={{fontWeight:'bold'}}>{item.destTimeMin}</Text>
      </View>
      <TripLineBar color={line.hexcolor}/>
      <View style={{flex:1}}>
        <Text style={{paddingLeft:5,fontWeight:'bold'}}>{origin.name} BART STATION, {origin.city}</Text>
				<View style={{paddingLeft:5,backgroundColor:line.hexcolor,flexDirection:'row',alignItems:'center'}}>
        	<PlannerForwardArrow />
					<Text style={{paddingLeft:4}}>{item.trainHeadStation}</Text>
				</View>
        <View style={{paddingLeft:5,flexDirection:'row'}}>
          <RouteLineDetailBike />
          <Text>Bikes are{item.bikeflag === '1' ? '' : ' not'} allowed</Text>
        </View>
				{/* <TripDuration iconsize={15} duration={getMinutes(item.origDate,item.destDate)} /> */}
				<View style={{paddingLeft:5,flexDirection:'row'}}>
					<Timelapse size={15} />
					<Text style={{paddingRight:5}}>{getMinutes(item.origDate,item.destDate)} min time</Text>
				</View>
        <Text style={{paddingLeft:5,fontWeight:'bold'}}>{destination.name} BART STATION, {destination.city}</Text>
      </View>
    </View>
  )
}

/**
 * This screen shows the route choosen is great detail.
 */
function PlannerDetails({isFetching,details}) {

	if( isFetching) return <WaitingScreen />

	return (
		<View style={styles.container}>
			<View style={{paddingTop:10,paddingBottom:10,flexDirection:'row'}}>
				<TripTime time={details.origTimeMin} />
				<TripBar leg={details.leg} showMin={true} />
				<TripTime time={details.destTimeMin} />
			</View>
			<View style={{paddingBottom:10,flexDirection:'row',justifyContent:'space-around'}}>
				<TripDuration duration={getHoursMinutes(parseInt(details.tripTime))} />
				<TripChanges changes={details.leg.length} />
				<TripFare fare={details.fare} />
			</View>
			<View style={styles.flatListContainer}>
				<FlatList
					data={details.leg}
					renderItem={PlannerDetailsRenderItem}
					keyExtractor={(item,index) => `${index}ID`}
				/>
			</View>
		</View>
	)
}

PlannerDetails.propTypes = {
	details:PropTypes.object.isRequired,
	// "@clipper": "",
  // "@destTimeDate": "04/23/2019",
  // "@destTimeMin": "12:57 PM",
  // "@destination": "24TH",
  // "@fare": "2.5",
  // "@origTimeDate": "04/23/2019",
  // "@origTimeMin": "12:55 PM",
  // "@origin": "16TH",
  // "@tripTime": "2",
  // "fares": "normal-undefinedID",
  // "id": "12:55 PM-12:57 PMID",
  // "leg": Array [
  //   Object {
  //     "@bikeflag": "1",
  //     "@destTimeDate": "04/23/2019",
  //     "@destTimeMin": "12:57 PM",
  //     "@destination": "24TH",
  //     "@line": "ROUTE 7",
  //     "@load": "1",
  //     "@order": "1",
  //     "@origTimeDate": "04/23/2019",
  //     "@origTimeMin": "12:55 PM",
  //     "@origin": "16TH",
  //     "@trainHeadStation": "Millbrae",
  //   },
  // ],
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		paddingLeft:10,
		paddingRight:10,
	},
	renderItemContainer:{
		flex:1,
		flexDirection:'row',
		// backgroundColor:Colors.itemBackgroundColor,
		paddingLeft:5,
		paddingRight:5,
	},
	flatListContainer:{
		paddingTop:10,
		paddingBottom:10,
		borderRadius:10,
		backgroundColor:Colors.itemBackgroundColor,
	}
});

export {PlannerDetails}
