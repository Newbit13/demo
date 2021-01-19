import { createAppContainer } from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';

import ChatScreen from '../screen/Chat';
import HomeScreen from '../screen/Home';
import ZeroScreen from '../screen/Zero';
import ZeroScreen1 from '../screen/Zero1';
import ZeroScreen2 from '../screen/Zero2';
import SectionScreen from '../screen/Section';
import DiyScreen from '../screen/DIY';

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
  Zero: {
    screen: ZeroScreen,
  },
  Zero1: {
    screen: ZeroScreen1,
  },
  Zero2: {
    screen: ZeroScreen2,
  },
  Section: {
    screen: SectionScreen,
  },
  Diy: {
    screen: DiyScreen,
  },
},{
  initialRouteName: 'Diy',
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer