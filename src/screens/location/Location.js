import React from 'react'
import PropTypes from 'prop-types'
import {ActivityIndicator, Image, View, SectionList, Text} from 'react-native'
import Logger from 'js-logger'
import {renderItem,renderSectionHeader} from '../../components/LocationRenderers'
import { LocationScreenListHeader, WaitingScreen } from '../../components';
import Colors from '../../constants/Colors';

/**
 * Location screen. displays the bart station real time estimates.
 */
function Location({navigation:{navigate},onRefresh,onDetails,isFetching,stationsData,locationScreenData:{date,time,message,name,abbr,platformSections}}) {

	// TODO create progress indicator to show loading.
	if(isFetching) return <WaitingScreen />

	const messageValue = message.warning ? <Text style={{backgroundColor:'yellow'}}>{message.warning}</Text> : <View />;
	const data = {
		...stationsData[0],
		time,
		date,
		onRefresh:() => onRefresh(stationsData[0].abbr),
		onDetails:() => {
			onDetails(stationsData[0].abbr);
			navigate('LocationDetails',{name:stationsData[0].name});
		},
	};

	return (
		<View style={{backgroundColor:'white',padding:10,flex:1}}>
			<SectionList
				style={{flex:1}}
				ListHeaderComponent={() => (
					<View style={{paddingBottom:5}}>
						<LocationScreenListHeader {...data} />
						{messageValue}
					</View>
				)}
				
				renderItem={renderItem}
				renderSectionHeader={renderSectionHeader}
				sections={platformSections}

				keyExtractor={(item,index) => `id${index}`}
			/>
		</View>
	)
}

Location.propTypes = {

}

export {Location}

