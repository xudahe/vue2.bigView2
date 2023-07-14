import { setStore, getStore } from "@/utils/storage";

import { setTheme, toggleGrayMode } from "@/utils/index.js";

export default {
  state: {
    themeGray: getStore({ name: 'themeGray' }) || false, //一些重要特殊的日子，为了表示哀悼，需要将网页显示为灰色
    themeName: getStore({ name: 'themeName' }) || "001", //主题样式
  },
  mutations: {
    SET_THEME_NAME: (state, data) => {
      state.themeName = data;
      setStore({ name: "themeName", content: state.themeName, });
      setTheme(state.themeName);
    },
    SET_THEME_GRAY: (state, data) => {
      state.themeGray = data;
      setStore({ name: "themeGray", content: state.themeGray, });
      toggleGrayMode(state.themeGray);
    },
  },
  actions: {},
};
