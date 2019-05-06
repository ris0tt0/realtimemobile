import React from 'react'
import PropTypes from 'prop-types'
import {View,Text,SectionList	} from 'react-native'
import Logger from 'js-logger'
import { WaitingScreen } from '../../components';
import {RouteLineArrows} from '../../components/AIcons';

function LocationDetails({isFetching,details,routes,access}) {

	if(isFetching) return <WaitingScreen />

	const routeNames = routes.map((route,index) => (
		<View key={index} style={{backgroundColor:'whitesmoke', flexDirection:'row'}}>
			<RouteLineArrows color={route.hexcolor} />
			<Text style={{paddingLeft:4}}>{route.name}</Text>
		</View>
	));


	const listHeaderComponent = (
		<View>
			<Text>{details.name} {details.link}</Text>
			<Text>{details.address}</Text>
			<Text>{details.city}, {details.state}, {details.zipcode}</Text>
			<Text>{details.cross_street}</Text>
		</View>
	)

	const listFooterComponent = (
		<View style={{flexDirection:'column'}}>{routeNames}</View>
	)

	const accessList = [];

	if(access.bikeStation && access.bikeStation.length > 0)
	{
		accessList.push(<Text>{access.bikeStation}</Text>);
	}
	if(access.carShare.length > 0)
	{
		accessList.push(<Text>{access.carShare}</Text>);
	}
	if(access.destinations.length > 0)
	{
		accessList.push(<Text>{access.destinations}</Text>);
	}
	if(access.entering.length > 0)
	{
		accessList.push(<Text>{access.entering}</Text>);
	}
	if( access.exiting.length > 0)
	{
		accessList.push(<Text>{access.exiting}</Text>);
	}
	if(access.fillTime.length > 0)
	{
		accessList.push(<Text>{access.fillTime}</Text>);
	}
	if(access.lockers.length > 0)
	{
		accessList.push(<Text>{access.lockers}</Text>);
	}
	if( access.parking.length > 0)
	{
		accessList.push(<Text>{access.parking}</Text>);
	}
	if(access.transitInfo.length > 0)
	{
		accessList.push(<Text>{access.transitInfo}</Text>);
	}

	const sections=[
		{title: 'DETAILS', data: [
			<Text>{details.intro}</Text>,
			<Text>{details.attraction}</Text>,
			<Text>{details.food}</Text>,
			<Text>{details.shopping}</Text>,
			<Text>{details.platform_info}</Text>
		]},
		{title: 'ACCESS', data: accessList},
		// {title: 'Title2', data: ['item3', 'item4']},
		// {title: 'Title3', data: ['item5', 'item6']},
	];

	return (
		<View style={{flex:1}}>
			<SectionList
				renderItem={({item, index, section}) => item}
				renderSectionHeader={({section: {title}}) => (
					<Text style={{backgroundColor:'lightblue',fontWeight: 'bold'}}>{title}</Text>
				)}
				ListHeaderComponent={listHeaderComponent}
				ListFooterComponent={listFooterComponent}
				sections={sections}
			/>
		</View>


		// <View style={{flex:1}}>
		// 	<Text>{details.name}</Text>
		// 	<Text>{details.address}</Text>
		// 	<Text>{details.city}, {details.state}, {details.zipcode}</Text>
		// 	<Text>{details.cross_street['#cdata-section']}</Text>
		// 	<Text style={{color:'darkgray', fontSize:10}}>info:</Text>
		// 	<Text>{details.intro['#cdata-section']}</Text>
		// 	<Text style={{color:'darkgray', fontSize:10}}>platform info:</Text>
		// 	<Text>{details.platform_info}</Text>
		// 	<Text style={{color:'darkgray', fontSize:10}}>lines serving this station:</Text>
		// 	<View style={{flexDirection:'column'}}>{routeNames}</View>
		// 	<Text>{stationsAccess.bikeStation}</Text>
		// 	<Text>{stationsAccess.carShare}</Text>
		// 	<Text>{stationsAccess.destinations}</Text>
		// 	{/* <Text>{stationsAccess.entering.replace(/(<([^>]+)>)/ig,'')}</Text> */}
		// 	<Text>{stationsAccess.entering}</Text>
		// 	<Text>{stationsAccess.exiting}</Text>
		// 	<Text>{stationsAccess.fillTime}</Text>
		// 	<Text>{stationsAccess.lockers}</Text>
		// 	<Text>{stationsAccess.parking}</Text>
		// 	<Text>{stationsAccess.transitInfo}</Text>
		// </View>
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
}

export default LocationDetails

