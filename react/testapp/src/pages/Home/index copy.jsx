import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import './index.css';

import Logo from '../../components/Logo';
import Demo from '../../components/Demo';

export default function Home() {
  return (
    <View className="rax-demo-home">
      <Logo uri="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" />
      <img src="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" alt="" width="100" />
      <p>haha</p>
      <span>zzz</span>
      <i>good</i>
      <Demo />
      <Text className="rax-demo-title">Welcome to Your Rax App</Text>
    </View>
  );
}
