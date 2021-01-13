/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect,useCallback,useRef} from 'react';
import AppContainer from './src/route';
import Adp from './src/screen/Adp';

const App = () =>{
  const [flag,setFlag] = useState(true);
  const hideHandle = useCallback(()=>{
    setFlag(false)
  })
  return (
    flag?<Adp handleFinish={hideHandle}/>:<AppContainer />
  )
}
export default App;
