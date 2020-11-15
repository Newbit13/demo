import { createElement, useState, useEffect, useCallback } from 'rax';
import './index.css';
import request from 'universal-request';
// import FormData from 'form-data';
import Embed from 'rax-embed';
// console.log(Embed);
import { isWeChatMiniProgram } from 'universal-env'
// let Embed;
// if(!isWeChatMiniProgram){
//   Embed = import('rax-embed') 
//   console.log(Embed);
// }
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

// const host = "https://txt-api-test.sportsdt.com";
const host = "";
export default function Home() {
  const [data, setData] = useState([]);
  const [fz, setFz] = useState(1);
  const [op, setOp] = useState();
  useEffect(function () {
    request({
      url: host + "/guess-youku/api/group-guess/list",
      method: 'GET',
      data: {
        group_id: fz,
        page: 1,
        page_size: 20
      },
    }).then(function (res) {
      if (res.data.data.list) {
        setData(res.data.data.list);
      }
    })
  }, [fz, op])

  const buy = useCallback((questionid, optionid, odd) => {
    let fromData = new FormData()//小程序不兼容原生FormData只能自己拼接（库也不好用，也报错）
    fromData.append('question_id', questionid)
    fromData.append('option_id', optionid)
    fromData.append('odds', odd)
    fromData.append('score', 100)
    fromData.append('openid', op)
    request({
      url: host + "/guess-youku/api/group-guess/bet",
      // headers: { 'Content-Type': 'multipart/form-data; boundary=----' + fromData.getBoundary() },
      method: 'POST',
      data: fromData,
    }).then(function (res) {
      alert(res.data.message)
    })
  })
  return (
    <div style={{ width: '750rpx' }}>
      <h1>分组竞猜投注页（内部测试用）</h1>
      <div>
        <label htmlFor="fz">
          分组id
          <input
            type="text"
            id="fz"
            value={fz}
            onChange={(v) => {
              setFz(v.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label htmlFor="op">
          openid
          <input
            type="text"
            id="op"
            value={op}
            onChange={(v) => {
              setOp(v.target.value);
            }}
          />
        </label>
      </div>
      <table border="1" style={{ width: '100%', borderCollapse: "collapse" }}>
        <tr>
          <th style={{ width: '10rpx' }}>qs id</th>
          <th style={{ width: '1rpx' }}>img</th>
          <th style={{ width: '200rpx' }}>题目</th>
          <th style={{ width: '100rpx' }}>deadline</th>
          <th style={{ width: '1rpx' }}>总人数</th>
          <th style={{ width: '200rpx' }}></th>
        </tr>
        {data.map(function (item) {
          return (
            <tr id={item.question_id}>
              <td>{item.question_id}</td>
              <td><img src={item.image} alt="" style={{ width: '100rpx' }} /></td>
              <td>{item.title}</td>
              <td>{item.end_time}</td>
              <td>{item.all_bet_people}</td>
              <td>
                {item.option_list.map(function (v, i) {
                  return (
                    <div
                      id={v.id + i}
                      style={
                        {
                          border: "1px solid #0f0",
                          background: "#000",
                          color: "#fff",
                          borderRadius: "10px",
                          cursor: "pointer"
                        }
                      }
                      onClick={() => buy(item.question_id, v.id, v.odds)}
                    >
                      <span style={{ background: v.is_right == 1 ? "#f00" : "" }}>选项：{v.name}</span><br />
                      <span>指数：{v.odds}</span><br />
                      <span>参与人数{v.bet_people}</span>
                    </div>
                  )
                })}
              </td>
            </tr>
          )
        })}
      </table>
      <Z />
      <Embed
        src={'https://baidu.com'}
      />
    </div>
  );
}

