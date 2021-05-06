import Vue from 'vue';
import Vuex from 'vuex';
// ! state & mutations & actions
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// ! install vuex
Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

// ? vue3.x -> vuex
// Vuex.createStore({})

export default store;