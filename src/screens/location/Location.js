import React from 'react'
import PropTypes from 'prop-types'
import {View, SectionList, Text} from 'react-native'
import Logger from 'js-logger'


// helper functions
const renderItem = ({item, index, section}) => {
	Logger.info(item);
	return <Text>renderItem</Text>
};
const renderSectionHeader = ({item,index,section: {title}}) => <Text>{title}</Text>
const keyExtractor = (item,index) => `id${index}`;

/**
 * Location screen. displays the bart station real time estimates.
 * @param {*} param0 
 */
function Location({isFetching,locationScreenData:{date,time,message,name,abbr,platformSections}}) {

	// TODO create progress indicator to show loading.
	if(isFetching)
	{
		return <Text>Loading</Text>;
	}

	return (
		<SectionList
			ListHeaderComponent={() => (
				<View>
					<Text>{message}</Text>
					<Text>{name}</Text>
					<Text>{date}</Text>
					<Text>{time}</Text>
				</View>
			)}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			renderSectionHeader={renderSectionHeader}
			sections={platformSections}
		/>
	)
}

Location.propTypes = {

}

export {Location}

