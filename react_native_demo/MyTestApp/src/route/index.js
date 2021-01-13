import { createAppContainer } from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';

import ChatScreen from '../screen/Chat';
import HomeScreen from '../screen/Home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    // navigationOptions: {
    //   title: "Home",
    //   header: null,
    //   navigationBar: null
    // },
  },
  Chat: {
    screen: ChatScreen,
    // navigationOptions: {
    //   title: "Chat",
    //   header: null,
    //   navigationBar: null
    // },
  },
},{
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer