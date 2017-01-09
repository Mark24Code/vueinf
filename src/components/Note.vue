<template>
    <div id="demo">
        <div class="container">
            <Lane :todos="todos" @update="updateNode" class="level-0"></Lane>
        </div>
    </div>
</template>
<script>
import Lane from './Lane.vue'
export default {
    name: 'Note',
    components: {
        Lane
    },
    mounted: function() {
        // console.error(this.$store.state.todos);
    },
    data() {
        return {
            // todos: this.$store.state.todos
        }
    },
    computed:{
        todos(){
            return this.$store.getters.todos
        }
    },
    methods: {
        updateNode: function(expanedTodo) {
            console.error(expanedTodo.name);
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
