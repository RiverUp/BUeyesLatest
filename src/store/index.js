import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      news: {},
      newsPiecesSaved: null,
      pageNo: [],
      userId: "",
      drawerOrNot: false,
      token: "",
      ocrPicture: "",
      facePicture: "",
    };
  },
  getters: {},
  mutations: {
    ConvertNews(state, news) {
      state.news = news;
    },
    ConvertNewsSaved(state, newsPieces) {
      state.newsPiecesSaved = newsPieces;
    },
    SavePageNo(state, pageNo) {
      state.pageNo = pageNo;
    },
    StoreUserId(state, id) {
      state.userId = id;
    },
    InverseDrawer(state) {
      state.drawerOrNot = !state.drawerOrNot;
    },
    UpLoadOcr(state, ocrPicture) {
      state.ocrPicture = ocrPicture;
    },
    UpLoadFace(state, facePicture) {
      state.facePicture = facePicture;
    },
  },
  actions: {},
  modules: {},
});
