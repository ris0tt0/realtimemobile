import React from 'react'
import PropTypes from 'prop-types'
import {View,Text,SectionList,StyleSheet} from 'react-native'
import Logger from 'js-logger'
import { WaitingScreen } from '../../components';
import {RouteLineArrows} from '../../components/AIcons';
import HTML from 'react-native-render-html';
import Colors from '../../constants/Colors';

function LocationDetails({isFetching,details,routes,access}) {

	if(isFetching) return <WaitingScreen />

	const routeNames = routes.map((route,index) => (
		<View key={index} style={{backgroundColor:Colors.itemBackgroundColor, flexDirection:'row'}}>
			<RouteLineArrows color={route.hexcolor} />
			<Text style={{paddingLeft:4}}>{route.name}</Text>
		</View>
	));


	const listHeaderComponent = (
		<View style={styles.listHeader}>
			<Text>{details.address}</Text>
			<Text>{details.city}, {details.state}, {details.zipcode}</Text>
			<Text>{details.cross_street}</Text>
		</View>
	)

	const sections = [];
	const onlinkpress = (args) => Logger.info(args);

	if(access.entering.length > 0)
	{
		sections.push({title:'access',data:[<HTML onLinkPress={onlinkpress} html={access.entering} />]});
	}
	if( access.exiting.length > 0)
	{
		sections.push({title:'exiting',data:[<HTML onLinkPress={onlinkpress} html={access.exiting} />]});
	}
	if(access.lockers.length > 0)
	{
		sections.push({title:'lockers',data:[<HTML onLinkPress={onlinkpress} html={access.lockers} />]});
	}
	if( access.parking.length > 0)
	{
		sections.push({title:'parking',data:[<HTML onLinkPress={onlinkpress} html={access.parking} />]});
	}

	if(access.bikeStation && access.bikeStation.length > 0)
	{
		sections.push({title:'bike',data:[<HTML onLinkPress={onlinkpress} html={access.bikeStation}/>]})
	}
	if(access.carShare.length > 0)
	{
		sections.push({title:'car share',data:[<HTML onLinkPress={onlinkpress} html={access.carShare} />]})
	}
	if(access.destinations.length > 0)
	{
		sections.push({title:'destinations',data:[<HTML onLinkPress={onlinkpress} html={access.destinations} />]})
	}

	if(access.fillTime.length > 0)
	{
		sections.push({title:'fill time',data:[<HTML onLinkPress={onlinkpress} html={access.fillTime} />]});
	}

	if(access.transitInfo.length > 0)
	{
		sections.push({title:'transit information',data:[<HTML onLinkPress={onlinkpress} html={access.transitInfo} />]})
	}

	sections.push({title:'routes',data:[<View style={{flexDirection:'column'}}>{routeNames}</View>]});

	return (
		<View style={styles.container}>
			<SectionList
				renderItem={({item}) => (
					<View style={{paddingLeft:5,paddingRight:5,marginBottom:10,backgroundColor:Colors.itemBackgroundColor}}>{item}</View>)}
				renderSectionHeader={({section: {title}}) => (
					<Text key={title} style={styles.listRenderHeaderText}>{title}</Text>
				)}
				ListHeaderComponent={listHeaderComponent}
				// ListFooterComponent={listFooterComponent}
				sections={sections}
				keyExtractor={(item, index) => `${index}`}
			/>
		</View>
	)
}

LocationDetails.propTypes = {
	isFetching:PropTypes.bool.isRequired,
	details:PropTypes.shape({
		abbr:PropTypes.string,
		address:PropTypes.string,
		city:PropTypes.string,
		county:PropTypes.string,
		name:PropTypes.string,
		platform_info:PropTypes.string,
		state:PropTypes.string,
		zipcode:PropTypes.string,
	}).isRequired,
	routes:PropTypes.arrayOf(PropTypes.shape({
		abbr:PropTypes.string.isRequired,
		color:PropTypes.string.isRequired,
		hexcolor:PropTypes.string.isRequired,
		name:PropTypes.string.isRequired,
		routeID:PropTypes.string.isRequired,
	})).isRequired,
};

const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:10,
	},
	listHeader:{
		paddingBottom:10,
	},
	listRenderHeaderText:{
		backgroundColor:Colors.itemBackgroundColor,
		color:'gray',
		fontSize:20,
		fontWeight: 'bold',
		paddingLeft:5,
	}
});

export default LocationDetails

