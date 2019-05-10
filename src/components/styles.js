import React,{StyleSheet} from 'react-native'

const style = StyleSheet.create({

	StationsList: {
		flex: 1,
		// paddingTop: 22,
	 },
	 StationsList__renderItem: {
		 borderStyle:'solid',
		 borderBottomWidth:1,
		 borderBottomColor:'black',
		 paddingLeft: 15,
		 paddingRight:5,
		 paddingTop:10,
		 paddingBottom:10,
		 fontSize: 16,
	 },
	 //
	 StationSearchInput: {
		//  flex: 1,
		borderWidth:1,
		borderColor:'grey',
		borderStyle:'solid',
		backgroundColor:'white',
		padding:5,
		margin:5,
		fontSize: 16,
	 },
	 //
});

export default style;
