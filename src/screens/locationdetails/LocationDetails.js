import React from 'react'
import PropTypes from 'prop-types'
import {View,Text,SectionList	} from 'react-native'
import Logger from 'js-logger'
import { WaitingScreen } from '../../components';
import {RouteLineArrows} from '../../components/AIcons';

function LocationDetails({isFetching,details,routes,stationsAccess}) {

	if(isFetching) return <WaitingScreen />

	const routeNames = routes.map((route,index) => (
		<View key={index} style={{backgroundColor:'whitesmoke', flexDirection:'row'}}>
			<RouteLineArrows color={route.hexcolor} />
			<Text style={{paddingLeft:4}}>{route.name}</Text>
		</View>
		));

		const sections=[
			{title: 'Title1', data: [<View><Text>jonathan gee</Text></View>]},
			// {title: 'Title1', data: ['item1', 'item2']},
			// {title: 'Title2', data: ['item3', 'item4']},
			// {title: 'Title3', data: ['item5', 'item6']},
		];

	return (
		<View style={{flex:1}}>
			<SectionList
				renderItem={({item, index, section}) => item}
				renderSectionHeader={({section: {title}}) => (
					<Text style={{fontWeight: 'bold'}}>{title}</Text>
				)}
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

