import React,{useState,useEffect} from 'react';

function Ka(){
  return (
    <p>ha</p>
  )
}
function Ca(K){
  return ()=>{
    return (
      <div>
        dsadsad
        <K />
      </div>
    )
  }
}

let Z = Ca(Ka);

function App() {
  return (
    <div>
      <Z />
    </div>
  ) 
}


export default App;
