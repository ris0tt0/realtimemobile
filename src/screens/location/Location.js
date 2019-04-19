import React from 'react'
import PropTypes from 'prop-types'
import {View, SectionList, StyleSheet, Text} from 'react-native'
import Logger from 'js-logger'
import {renderItem,renderSectionHeader} from '../../components/LocationRenderers'
import { LocationScreenListHeader } from '../../components';

/**
 * Location screen. displays the bart station real time estimates.
 */
function Location({isFetching,stationsData,locationScreenData:{date,time,message,name,abbr,platformSections}}) {

	// TODO create progress indicator to show loading.
	if(isFetching)
	{
		return <Text>Loading</Text>;
	}

	const messageValue = message.warning ? <Text style={{backgroundColor:'yellow'}}>{message.warning}</Text> : <View />;

	Logger.info(stationsData[0]);
	const data = stationsData[0];

	return (
		<View style={{flex:1}}>
			<SectionList
				ListHeaderComponent={() => (
					<View>
						<LocationScreenListHeader {...{...data,time,date}} />
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

