import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger'
import {FlatList,StyleSheet, View} from 'react-native'
import {
	TripTime,
	TripBar,
	TripDuration,
	TripChanges,
	TripFare,
	WaitingScreen } from '../../components';
import { PlannerDetailsRenderItem } from '../../components/PlannerRenderers';

/**
 * This screen shows the route choosen is great detail.
 */
function PlannerDetails({isFetching,details}) {

	if( isFetching) return <WaitingScreen />

	return (
		<View style={styles.container}>
			<View style={{paddingTop:10,paddingBottom:10,flexDirection:'row'}}>
				<TripTime time={details.origTimeMin} />
				<TripBar leg={details.leg} />
				<TripTime time={details.destTimeMin} />
			</View>
			<View style={{paddingBottom:10,flexDirection:'row',justifyContent:'space-around'}}>
				<TripDuration duration={details.tripTime} />
				<TripChanges changes={details.leg.length} />
				<TripFare fare={details.fare} />
			</View>
			<FlatList
				data={details.leg}
				renderItem={PlannerDetailsRenderItem}
				keyExtractor={(item,index) => `${index}ID`}
			/>
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
});

export {PlannerDetails}
