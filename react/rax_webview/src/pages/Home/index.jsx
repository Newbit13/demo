import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import './index.css';
import Embed from 'rax-embed';

export default function Home() {
  return (
    <Embed
      src={'https://baidu.com'}
    />
  );
}
