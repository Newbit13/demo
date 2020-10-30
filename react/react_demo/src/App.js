import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [mylist,setMyList] = useState([]);
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
    </div>
  );
}

export default App;
