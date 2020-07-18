import React from "react";
export const Context = React.createContext();
export const Provider = Context.Provider;
export const Consumer = Context.Consumer;

export const state = {
  home: {
    content: "这是首页",
  },
  user: {
    isLogin: true,
    userName: "zzl#001",
  },
  count: 0,
};

const dispatch = (action) => {
  state.count = action;
};

export const store = {
  state,
  dispatch,
};
