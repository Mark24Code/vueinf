<template>
    <div>
        <ul v-for="(todo,index) in todos">
            <li><span @click="toggle(todo)">{{todo.title}}</span>
                <div v-if="todo.children && todo.children.length > 0">
                    <Lane :todos="todo.children" :class="'level level-' + todo.level" :style="{left: left + 'px'}"></Lane>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
import Bus from './Bus.vue'
import config from '../api/config.js'
export default {
    name: 'Lane',
    props: ['todos'],
    computed: {
        left() {
            return 200;
        }
    },
    methods: {
        toggle(todo) {
            for (let key in this.todos) {
                let _todo = this.todos[key];
                if (todo.id !== _todo.id) {
                    Vue.set(_todo, 'children', []);
                }
            }
            this.$http.get(config.apiBaseUrl + 'todo/list', {params: {parent_id: todo.id}}).then((response) => {
                Vue.set(todo, 'children', response.data);
                this.$store.commit('updateNode', response.data);
            });
        }
    }
}
</script>
<style scoped>
</style>
