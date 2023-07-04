export default {
  state: {
    GISToken: "YGzF1pSSi5awB-d-QumbDCmRA8853m99hh55iYn6Vzmf7XNv_d2py9SyIcy_AwtmvHh4C0oNlKTdFMAqbxPGpQ..", //底图的token
    mapload: false, //监听地图是否加载完成
    mapscale: -1, //监听地图比例尺

    //----------------------------------------split_mode--------------------------------------
    splitFlag: false, //是否开启分屏模式
    splitScreens: [],
    topicList: [], //图层控制 数据源
    splitMapId: "", //当前鼠标指针操作的分屏地图Id
    queryVisible: false, //分屏模式中的工具栏
  },
  mutations: {
    GISToken(state, arg) {
      state.GISToken = arg;
    },
    mapload(state, arg) {
      state.mapload = arg;
    },
    mapscale(state, arg) {
      arg.scale = arg.scale % 2 ? arg.scale + 1 : arg.scale;
      state.mapscale = arg;
    },

    splitFlag(state, val) {
      state.splitFlag = val;
    },
    splitScreens(state, val) {
      state.splitScreens = val;
    },
    splitMapId(state, val) {
      state.splitMapId = val;
    },
    queryVisible(state, val) {
      state.queryVisible = val;
    },
  },
  actions: {
    GISToken({ commit }, arg) {
      commit("GISToken", arg);
    },
    mapload({ commit }, arg) {
      commit("mapload", arg);
    },
    mapscale({ commit }, arg) {
      commit("mapscale", arg);
    },
  },
};
