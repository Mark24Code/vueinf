<template>
    <div>
        <ul v-for="(todo,index) in todos">
            <li>
                <input type="TEXT" name="" @click="toggle(todo)" v-model="todo.title" placeholder="请输入内容">
                <button @click="removeRow(todo)">-</button>

                <div v-if="todo.children && todo.children.length > 0">
                    <Lane :parent="todo" :todos="todo.children" :class="'level level-' + todo.level" :style="{left: left + 'px'}" @removeChild="removeChild"></Lane>
                </div>
            </li>
        </ul>
        <button @click="addRow">+</button>        
    </div>
</template>
<script>
import Vue from 'vue'
import Bus from './Bus.vue'
import config from '../api/config.js'
import _ from 'lodash'
export default {
    name: 'Lane',
    props: ['todos', 'parent'],
    computed: {
        left() {
            return 200;
        }
    },
    mounted() {
        let todos = this.normalizeTodos(this.todos);
        if (this.parent.id === 0 ) {
            this.$store.commit('reset', todos);
        } else {
            Vue.set(this.parent, 'children', todos);
        }

    },
    methods: {
        normalizeTodos(todos) {
            const MAX = 5;
            let result = todos;
            let defaultTodo = {level: this.parent.level + 1, parent_id: this.parent.id, id: -1};

            if (todos.length < MAX) {
                result = _.concat(todos, _.fill(Array(MAX - todos.length), defaultTodo));            
            } 
            return result;
        },
        toggle(todo) {
            for (let key in this.todos) {
                let _todo = this.todos[key];
                if (todo.id !== _todo.id) {
                    Vue.set(_todo, 'children', []);
                }
            }
            this.$http.get(config.apiBaseUrl + 'todo/list', {params: {parent_id: todo.id}}).then((response) => {
                // if (response.data.length == 0) {
                    let todos  = this.normalizeTodos(response.data);
                    // console.error(response.data);
                // }
                Vue.set(todo, 'children', todos);
            });
        },
        addRow: function() {
            this.todos.push({level: this.parent.level + 1, parent_id: this.parent.id, id: -1});
        },
        removeRow: function(todo) {
            // if(confirm('Gonna delete all todos related to this, sure to continue?')) {
                this.$emit('removeChild', todo);
                this.$emit('removeLane', todo);
            // }
        },
        removeChild: function(todo) {
            let parentObj = null;
            for (let key in this.todos) {
                if (todo.parent_id === this.todos[key].id) {
                    parentObj = this.todos[key];
                    break;
                }
            }
            let children = _.remove(parentObj.children, function(_todo) {
                return _todo.id !== todo.id;
            });
            Vue.set(parentObj, 'children', children); // parentObj.children = children; // 也能工作.
        }
    }
}
</script>
<style scoped>
</style>
