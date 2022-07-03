import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      news: {},
      newsPiecesSaved: null,
      pageNo: [],
      userId: "",
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
  },
  actions: {},
  modules: {},
});
