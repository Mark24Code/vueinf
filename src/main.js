// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource  from 'vue-resource'
import App from './App'
import config from './api/config.js'
/* eslint-disable no-new */
Vue.use(Vuex);
Vue.use(VueResource);
Vue.http.get(config.apiBaseUrl + 'todo/list').then(function(response) {
    let todos = response.data;
    const store = new Vuex.Store({
        state: {
            count: 0,
            todos
        },
        mutations: {
            updateNode(state, children) {
                // alert('update me...');
                state.todos = {};
            }
        }
    });
    new Vue({
        el: '#app',
        store,
        template: '<App/>',
        components: { App }
    })
});
