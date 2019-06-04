import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger'
import {View,StyleSheet,Text} from 'react-native'
import { TripTime,TripLineBar } from '../components/';
import { bold } from 'ansi-colors';
import { RouteLineDetailBike, PlannerForwardArrow } from './AIcons';
import Colors from '../constants/Colors';

function itemStation(time,stationName, city){
  return (
    <View style={{flexDirection:'row'}}>
      <TripTime time={time} />
      <Text>{stationName}</Text>
    </View>
  )
}



const styles = StyleSheet.create({

});

export {PlannerDetailsRenderItem}


