<template>
    <li>
        <div class="lfbox" :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
            {{model.fid}}-{{model.oid}}:{{model.name}}
            <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
            <item class="item itembox" v-for="model in model.children" :model="model">
            </item>
            <li class="add" @click="addChild">+</li>
        </ul>
    </li>
</template>
<script>
import Vue from 'vue'
export default {
    name: 'item',
    props: {
        model: Object
    },
    data() {
        return {
            open: false
        }
    },
    computed: {
        isFolder: function() {
            return this.model.children &&
                this.model.children.length
        }
    },
    methods: {
        toggle: function() {
            if (this.isFolder) {
                this.open = !this.open
            }
        },
        changeType: function() {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
        },
        addChild: function() {
            var _this = this;
            var sub_id =  0;
            if(_this.model.childrenids.length!==0){
               sub_id =  _this.max(_this.model.childrenids) + 1;
            }
            _this.model.childrenids.push(sub_id)
            _this.model.children.push({
                fid: _this.model.fid + 1,
                oid: sub_id,
                name: 'new stuff',
                childrenids:[],
                children:[]
            });
        },
        max: function(arr) {
            var max = arr[0];
            var len = arr.length;
            for (var i = 1; i < len; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        }
    }
}
</script>
<style scoped>
</style>
