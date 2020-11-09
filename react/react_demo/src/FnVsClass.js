import React,{useState,useEffect} from 'react';



function App() {
  return (
    <div>
      <Fc />
      <Cc />
    </div>
  ) 
}

function Fc(){
  return (
    <div>
      {useTime().getSeconds()}
    </div>
  );
}

function useTime(){
  const [date,setDate] = useState(new Date());

  useEffect(()=>{
    const timer = setInterval(function(){
      setDate(new Date())
    },1000)
    //相当于componentWillUnmount
    return ()=>{
      clearInterval(timer)
    }
  },[]);

  return date;
}
function updateTime(){
  var that = this;
  that.setState({
    date:new Date()
  })
  const Timer = setInterval(function(){
    that.setState({
      date:new Date()
    })
  },1000)
  return Timer;
}
class Cc extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount(){
    this.timmer = updateTime.apply(this)
  }
  componentWillUnmount(){
    clearInterval(this.timmer);
  }
  render(){
    return (
      <div>
        {this.state.date && this.state.date.getSeconds()}
      </div>
    )
  }
}


export default App;
