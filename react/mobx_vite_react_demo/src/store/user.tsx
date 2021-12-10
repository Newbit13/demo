import { observable, action, makeObservable } from "mobx";

class user {
  constructor() {
    makeObservable(this); //mbox 6后需要添加方法才会更新
  }

  @observable
  name = "no name";

  @action
  update() {
    this.name = "jack";
  }
}

export { user };
