import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger'
import {View,Text} from 'react-native'
import { TripBar,TripTime,TripFare,TripDuration } from '../components/';

function ResultRenderItem({item,index}) {
	
	return (
		<View key={index} style={{flex:1}}>
			<TripBar leg={item.leg}/>
			<View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
				<TripTime time={item['@origTimeMin']}/>
				<TripDuration duration={item['@tripTime']}/>
				<TripFare fare={item['@fare']}/>
				<TripTime time={item['@destTimeMin']}/>
			</View>
		</View>
	)
}

ResultRenderItem.propTypes = {
  //   "@clipper": "",
  //   "@destTimeDate": "04/22/2019",
  //   "@destTimeMin": "01:29 AM",
  //   "@destination": "DUBL",
  //   "@fare": "8.5",
  //   "@origTimeDate": "04/21/2019",
  //   "@origTimeMin": "11:46 PM",
  //   "@origin": "ANTC",
  //   "@tripTime": "103",
  //   "fares": "normal-undefinedID",
  //   "leg": Array [
  //     Object {
  //       "@bikeflag": "1",
  //       "@destTimeDate": "04/22/2019",
  //       "@destTimeMin": "12:47 AM",
  //       "@destination": "MCAR",
  //       "@line": "ROUTE 1",
  //       "@load": "1",
  //       "@order": "1",
  //       "@origTimeDate": "04/21/2019",
  //       "@origTimeMin": "11:46 PM",
  //       "@origin": "ANTC",
  //       "@trainHeadStation": "San Francisco International Airport",
  //     },
}

export {ResultRenderItem}

