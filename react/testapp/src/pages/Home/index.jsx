import { createElement, useState, useEffect, useCallback } from 'rax';
import './index.css';

// import axios from 'axios';
// const host = "https://txt-api-test.sportsdt.com";
// // const host = "";
// export default function Home() {
//   const [data, setData] = useState([]);
//   const [fz, setFz] = useState();
//   const [op, setOp] = useState();
//   useEffect(function () {
//     axios.get(host + "/guess-youku/api/group-guess/list", {
//       params: {
//         group_id: fz,
//         page: 1,
//         page_size: 20
//       }
//     }).then(function (res) {
//       if (res.data.data.list) {
//         console.log(res.data.data.list);
//         setData(res.data.data.list);
//       }
//     })
//   }, [fz, op])

//   const buy = useCallback((questionid, optionid, odd) => {
//     let fromData = new FormData()
//     fromData.append('question_id', questionid)
//     fromData.append('option_id', optionid)
//     fromData.append('odds', odd)
//     fromData.append('score', 100)
//     fromData.append('openid', op)

//     axios.post(host + "/guess-youku/api/group-guess/bet", fromData, {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     }).then(function (res) {
//       // console.log(res);
//       alert(res.data.message)
//     })
//   })
//   return (
//     <div>
//       <h1>分组竞猜投注页（内部测试用）</h1>
//       <div>
//         <label htmlFor="fz">
//           分组id
//           <input
//             type="text"
//             id="fz"
//             value={fz}
//             onChange={(v) => {
//               setFz(v.target.value);
//             }}
//           />
//         </label>
//       </div>
//       <div>
//         <label htmlFor="op">
//           openid
//           <input
//             type="text"
//             id="op"
//             value={op}
//             onChange={(v) => {
//               setOp(v.target.value);
//             }}
//           />
//         </label>
//       </div>
//       <table border="1">
//         <tr>
//           <th>questionId</th>
//           <th>图片</th>
//           <th>题目</th>
//           <th>截至时间</th>
//           <th>总人数</th>
//           <th></th>
//         </tr>
//         {data.map(function (item) {
//           return (
//             <tr id={item.question_id}>
//               <td>{item.question_id}</td>
//               <td><img src={item.image} alt="" width="100" /></td>
//               <td>{item.title}</td>
//               <td>{item.end_time}</td>
//               <td>{item.all_bet_people}</td>
//               <td>
//                 {item.option_list.map(function (v, i) {
//                   return (
//                     <div
//                       id={v.id + i}
//                       style={
//                         {
//                           border: "1px solid #0f0",
//                           background: "#000",
//                           color: "#fff",
//                           borderRadius: "10px",
//                           cursor: "pointer"
//                         }
//                       }
//                       onClick={() => buy(item.question_id, v.id, v.odds)}
//                     >
//                       <span style={{ background: v.is_right == 1 ? "#f00" : "" }}>选项：{v.name}</span><br />
//                       <span>指数：{v.odds}</span><br />
//                       <span>参与人数{v.bet_people}</span>
//                       <span>is_choice{v.is_choice}</span>
//                     </div>
//                   )
//                 })}
//               </td>
//             </tr>
//           )
//         })}
//       </table>
//     </div>
//   );
// }

// -----------------------------------------------
import request from 'universal-request';
const host = "https://txt-api-test.sportsdt.com";
// const host = "";
export default function Home() {
  const [data, setData] = useState([]);
  const [fz, setFz] = useState();
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
      // console.log(res);
      if (res.data.data.list) {
        // console.log(res.data.data.list);
        setData(res.data.data.list);
      }
    })
  }, [fz, op])

  const buy = useCallback((questionid, optionid, odd) => {
    let fromData = new FormData()
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
      // fromData,
      // data: {
      //   question_id: questionid,
      //   option_id: optionid,
      //   odds: odd,
      //   score: 100,
      //   openid: op
      // },
    }).then(function (res) {
      // console.log(res);
      alert(res.data.message)
    })
  })
  return (
    <div>
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
      <table border="1">
        <tr>
          <th>question_id</th>
          <th>图片</th>
          <th>题目</th>
          <th>截至时间</th>
          <th>总人数</th>
          <th></th>
        </tr>
        {data.map(function (item) {
          return (
            <tr id={item.question_id}>
              <td>{item.question_id}</td>
              <td><img src={item.image} alt="" width="100" /></td>
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
    </div>
  );
}