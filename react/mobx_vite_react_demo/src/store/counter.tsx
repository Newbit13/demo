import { observable, action, makeObservable } from "mobx";

class counter {
  constructor() {
    makeObservable(this); //mbox 6后需要添加方法才会更新
  }

  @observable
  count = 222;

  @observable
  countObj = {
    val: 333,
  };

  @action
  add() {
    console.log("counter add");
    this.count += 1;
  }

  @action
  addObj() {
    console.log("counter addObj");
    this.countObj.val += 1;
  }

  @action
  minus() {
    this.count -= 1;
  }
}

export { counter };
