import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      news: {},
      newsPiecesSaved: null,
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
  },
  actions: {},
  modules: {},
});
