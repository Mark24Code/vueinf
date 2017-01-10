<template>
    <div id="demo">
        <div class="container">
            <Lane :parent="parent" :todos="todos" class="level-0" @removeLane="removeLane"></Lane>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Lane from './Lane.vue'
import _ from 'lodash'
export default {
    name: 'Note',
    components: {
        Lane
    },
    mounted: function() {
        console.error(this.$store.state.todos);
    },
    computed:{
        todos() {
            // return this.$store.getters.todos
            return this.$store.state.todos
        },
        parent() {
            return {id: 0, level:0}
        }
    },
    methods: {
        removeLane(todo) {
            let todos = _.remove(this.todos, function(_todo) {
                return _todo.id !== todo.id;
            });
            this.$store.commit('reset', todos);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#demo {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}

</style>
