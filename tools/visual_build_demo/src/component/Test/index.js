import React from 'react'
import './test.css'

class Drag extends React.Component {
  constructor() {
    super()
    this.state = {
      nodeArr: [],
      num: 1
    }
  }
  allowDrop = (ev) => {
    ev.preventDefault()
  }

  drag = (ev) => {
    ev.dataTransfer.setData('Text', ev.target.id)
  }

  drop = (ev) => {
    let { nodeArr, num } = this.state
    num++
    ev.preventDefault()
    var data = ev.dataTransfer.getData('Text')
    if (data) {
      let dragDom = document.getElementById(data)
      if (dragDom.getAttribute('nocopy')) {
        let dragindex = nodeArr.findIndex((item) => item.id === data)
        let dragData = nodeArr[dragindex]
        nodeArr.splice(dragindex, 1)
        let id = ev.target.id
        let targetindex = nodeArr.findIndex((item) => item.id === id)
        if (targetindex !== -1) {
          nodeArr.splice(targetindex, 0, dragData)
        } else {
          nodeArr.push(dragData)
        }
      } else {
        let obj = {
          key: data + num,
          nocopy: 'true',
          id: data + num,
          onDragStart: (event) => this.drag(event),
          className: 'symbol-top',
          value: dragDom.getAttribute('value')
        }
        nodeArr.push(obj)
      }
    }
    this.setState({
      nodeArr: [...nodeArr],
      num
    })
  }

  delete = (id) => {
    let { nodeArr } = this.state
    let dragindex = nodeArr.findIndex((item) => item.id === id)
    nodeArr.splice(dragindex, 1)
    this.setState({
      nodeArr: [...this.state.nodeArr]
    })
  }

  render() {
    const symbolList = ['*', '/', '==', '+', '-', '>', '<']
    const { nodeArr } = this.state
    return (
      <div style={{ width: '100%', height: '800px' }} className='test'>
        <div style={{ width: '60%', marginLeft: '100px' }}>
          <div>
            <div>
              {symbolList.map((item) => {
                return <span className='symbol-top' draggable='true' onDragStart={(event) => this.drag(event)} key={item} id={item} value={item}>{item}</span>
              })}
            </div>
          </div>
          <div id='div1' onDrop={(event) => this.drop(event)} onDragOver={(event) => this.allowDrop(event)}>
            {
              nodeArr.map((child) => {
                // return <span {...child}>{child.value}</span>
                return <span
                  draggable
                  key={child.key}
                  id={child.id}
                  nocopy={child.nocopy}
                  onDragStart={child.onDragStart}
                  className={child.className}
                >{child.value} <span onClick={() => this.delete(child.id)}>×</span></span>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Drag