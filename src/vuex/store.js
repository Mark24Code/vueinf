import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    cur_open:{
        fid:0,
        oid:0
    }
}

const mutations = {
    UPDATE_CUR_OPEN(state,cur_open){
        state.cur_open.fid = cur_open.fid;
        state.cur_open.oid = cur_open.oid;
    }
}

const actions = {
    update_cur_open({commit},cur_open){
        commit('UPDATE_CUR_OPEN',cur_open)
    }
}

const getters = {
    cur_open(state){
        return state.cur_open
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})