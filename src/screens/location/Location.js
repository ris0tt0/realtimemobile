import React from 'react'
import PropTypes from 'prop-types'
import {View, SectionList, Text} from 'react-native'
import Logger from 'js-logger'


const renderItem = ({item, index, section}) => <Text key={index}>{item}</Text>;

const renderSectionHeader = ({section: {title}}) => {

};

/**
 * Location screen. displays the bart station real time estimates.
 * @param {*} param0 
 */
function Location({isFetching,response,platformMap}) {

	platformMap.map(platform =>{
		platform.forEach((platform,platformName) =>{
			// Logger.info(`${platformName}`)
			platform.forEach((train,stationAbbr) =>{
				// Logger.info(`${stationAbbr}`);
				// Logger.info(train);
			})
		})
	})

	return (
		<View>
			<Text>bart station here: {isFetching ? 'true' : 'false'}</Text>
		</View>
	)
}

Location.propTypes = {

}

export {Location}

