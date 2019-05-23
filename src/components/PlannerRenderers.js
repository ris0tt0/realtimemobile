import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger'
import {View,Text} from 'react-native'
import { TripBar,TripTime,TripFare,TripDuration,TripLineBar } from '../components/';
import { bold } from 'ansi-colors';
import { RouteLineDetailBike } from './AIcons';

function itemStation(time,stationName, city){
  return (
    <View style={{flexDirection:'row'}}>
      <TripTime time={time} />
      <Text>{stationName}</Text>
    </View>
  )
}

function PlannerDetailsRenderItem({item,index}) {
  const {origin,destination,line} = item;

//   var d = new Date(item['@origTimeDate'])
//   var e = new Date(item['@destTimeDate']);

//   d.setHours(10,58);
//   e.setHours(11,1);

//   Logger.info(d)
//   Logger.info(e);
//   const v = e-d;
// const t = v/1000;
// const minutes = t/60;

//   Logger.info(minutes);

//   const hourIndex = item['@origTimeMin'].search(/\d\d:/);
//   const minIndex = item['@origTimeMin'].search(/:\d\d/);


  return (
    <View style={{flex:1,flexDirection:'row'}}>
      <View style={{justifyContent:'space-between'}}>
        <Text style={{fontWeight:'bold'}}>{item.origTimeMin}</Text>
        <Text style={{fontWeight:'bold'}}>{item.destTimeMin}</Text>
      </View>
      <TripLineBar color={line.hexcolor}/>
      <View>
        <Text style={{fontWeight:'bold'}}>{origin.name} BART STATION, {origin.city}</Text>
        <Text style={{backgroundColor:line.hexcolor}}>{item.trainHeadStation}</Text>
        <View style={{flexDirection:'row'}}>
          <RouteLineDetailBike />
          <Text>Bikes are{item.bikeflag === '1' ? '' : ' not'} allowed</Text>
        </View>
        <Text style={{fontWeight:'bold'}}>{destination.name} BART STATION, {destination.city}</Text>
      </View>
    </View>
  )
}

PlannerDetailsRenderItem.propTypes = {

}


export {PlannerDetailsRenderItem}


