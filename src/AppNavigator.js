import MainTabNavigator from './MainTabNavigator'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

export default createAppContainer(createSwitchNavigator({
	Main:MainTabNavigator,
}));
