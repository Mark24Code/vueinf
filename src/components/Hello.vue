<template>
    <ul id="demo">
        <item class="item" :model="treeData">
        </item>
    </ul>
</template>
<script>
import item from './item.vue'
export default {
    name: 'hello',
    components:{
      item
    },
    data() {
        return {
            treeData: {
                name: 'My Tree',
                children: [{
                    name: 'hello'
                }, {
                    name: 'wat'
                }, {
                    name: 'child folder',
                    children: [{
                        name: 'child folder',
                        children: [{
                            name: 'hello'
                        }, {
                            name: 'wat'
                        }]
                    }, {
                        name: 'hello'
                    }, {
                        name: 'wat'
                    }, {
                        name: 'child folder',
                        children: [{
                            name: 'hello'
                        }, {
                            name: 'wat'
                        }]
                    }]
                }]
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lfbox {
    width: 100px;
    height: 200px;
    float: left;
    border: 1px solid #000;
    box-sizing: border-box;
    text-align: center;
}

.itembox {
    width: 95px;
    height: 50px;
    border: 1px solid #999;
    text-align: center;
    clear: both;
    margin: 2px auto;
}
</style>
