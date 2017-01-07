<template>
    <div id="demo">
<!--         <h1>Hello world</h1>
        <p>双击切换类型，单击展开/收起文件</p> -->
        <div class="container">
            <item class="item" :model="treeData" :cur_index="0">
            </item>
        </div>
    </div>
</template>
<script>
import item from './item.vue'
export default {
    name: 'hello',
    components: {
        item
    },
    data() {
        return {
            treeData: {
                fid: 0,
                oid: 0,
                name: 'My Tree',
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
    margin: 10px;
    overflow: hidden;
}
.container{
  position: relative;
}
</style>
