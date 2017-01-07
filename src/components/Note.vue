<template>
    <div id="demo">
        <div class="container">
            <Item class="item" :model="treeData" :cur_index="0">
            </Item>
        </div>
    </div>
</template>
<script>
import Item from './Item.vue'
export default {
    name: 'Note',
    components: {
        Item
    },
    data() {
        return {
            treeData: {
                fid: 0,
                oid: 0,
                id:0,
                name: '我的笔记',
                childrenids: [],
                children: []
            }
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
