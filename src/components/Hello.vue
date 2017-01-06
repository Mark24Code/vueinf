<template>
    <ul id="demo">
        <h1>Hello world</h1>
        <p>双击切换类型，单击展开/收起文件</p>
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

</style>
