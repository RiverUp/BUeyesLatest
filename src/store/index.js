import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      news: {},
      newsPiecesSaved: null,
      pageNo: [],
      userId: 0,
      drawerOrNot: false,
      //token: "",
      ocrPicture: "",
      recognizedContent: "",
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
    UpLoadOcrText(state, ocrContent) {
      state.recognizedContent = ocrContent;
    },
    UpLoadFace(state, facePicture) {
      state.facePicture = facePicture;
    },
  },
  actions: {},
  modules: {},
});
