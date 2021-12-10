import React, { createContext, useContext } from "react";
import { counter } from "./counter";
import { user } from "./user";

const store = {
  //用于通过provider提供给class组件
  counter: new counter(),
  user: new user(),
};

const context = createContext(store);

const useStores = () => useContext(context); //用于fn组件

export { store, useStores };
