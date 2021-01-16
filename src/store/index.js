import Vue from 'vue';
import Vuex from '../../source/vuex/main.js';

console.log(Vuex);

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        dbCount: state => state.count * 2
    },
    mutations: {
        add(state) {
            // state从哪来
            state.count++;
        }
    },
    actions: {
        // 上下文对象是什么，从哪来
        add({ commit }) {
            setTimeout(() => {
                commit('add');
            }, 1000);
        }
    },
    modules: {
        cart: {
            nameSpace: true,
            state: {
                count: 3,
                page: 1
            },
            getters: {
                dbPage: (state) => {
                    return state.page * 2;
                },
                dbCount: (state, getters, rootState) => {
                    return state.count + getters.dbPage + rootState.count;
                }
            }
            
        }
    }
});
