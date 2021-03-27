import React,{useState,useEffect,lazy,Suspense} from 'react';
import logo from './logo.svg';
import './static/css/App.css';

const Foo = lazy(() => import('./component/Foo'));


function App() {
  const [mylist,setMyList] = useState([]);
  const [Cmp,upCmp] = useState(null);
  const [test,upTest] = useState("gulugulu");
  useEffect(()=>{
    console.log(111);
    const temp = [];
    for(var i = 0;i<5;i++){
      temp.push({
        id:i+'ididid'
      })
    }
    setMyList(temp);
  },[]);

  function loadCmp(){
    //用import才能在需要组件时异步加载相应的js
    // const Foo = require('./component/Foo');
    // upCmp(Foo);

    // webpack提供了import供异步执行和独立出来打包成ChunkName,react.lazy原理与此相同
    const Foo = import(/* webpackChunkName: 'Foo' */'./component/Foo');
    Foo.then((v)=>{
      console.log(v.default);
      upCmp(v);
      upTest(function(...rest){
        console.log(rest);
      });
      // upCmp(v.default);//之后Cmp不是v.default的值，而是v.default执行后的值
    })
  }

  // console.log(Cmp);
  
  return (
    <div className="App">
      <button onClick={()=>{
        console.log(mylist);
        mylist.splice(1,1);
        console.log(mylist);
        setMyList([
          ...mylist
        ])
      }
      }>DELETE</button>
      {mylist.map((v)=>(
        <div key={v.id}>
          <input type="text" />
        </div>
      ))}
      <button onClick={loadCmp}>动态加载组件</button>
      {Cmp?React.createElement(Cmp.default):null}
      <Suspense fallback={<div>loading...</div>}>
        <Foo />
      </Suspense>
    </div>
  );
}

export default App;
