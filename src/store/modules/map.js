export default {
  state: {
    GISToken: "YGzF1pSSi5awB-d-QumbDCmRA8853m99hh55iYn6Vzmf7XNv_d2py9SyIcy_AwtmvHh4C0oNlKTdFMAqbxPGpQ..", //底图的token
    mapload: false, //监听地图是否加载完成
    mapscale: -1, //监听地图比例尺


    //------------------------------------------------------------------------------
    mapitems: [], //地图窗口组件id名称(分屏使用)
    mapitemsload: Object, //分屏预加载图层

    //----------------------------------------split_mode--------------------------------------
	splitFlag: false, //    
	splitScreens: [],
    topicList: [],
    splitMapId: "", //当前操作的分屏地图Id
    queryVisible: false,
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


    mapitems(state, arg) {
      state.mapitems = arg;
    },
    mapitemsload(state, arg) {
      state.mapitemsload = arg;
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
    GISToken({
      commit
    }, arg) {
      commit("GISToken", arg);
    },
    mapload({
      commit
    }, arg) {
      commit("mapload", arg);
    },
    mapscale({
      commit
    }, arg) {
      commit("mapscale", arg);
    },
    mapitems({
      commit
    }, arg) {
      commit("mapitems", arg);
    },
    mapitemsload({
      commit
    }, arg) {
      commit("mapitemsload", arg);
    },
  }
}