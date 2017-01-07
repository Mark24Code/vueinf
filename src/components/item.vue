<template>
    <div class="faBox" :style="{left:pos_left+'px',top:pos_top+'px'}" >
        <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
            {{model.fid}}-{{model.oid}}:{{model.name}}
            <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        </div>
        <div class="add" @click="addChild">添加</div>
        <div class="chBox" v-show="open" v-if="isFolder">
            <item class="item itembox" v-for="(model,index) in model.children" :model="model" :cur_index="index">
            </item>

        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name: 'item',
    props: {
        model: Object,
        cur_index:Number,

    },
    data() {
        return {
            el_W:160,
            el_H:50
        }
    },
    computed: {
        open: function(){
            var _this = this;
            var cur_open = _this.$store.getters.cur_open;
            var cur_open_fid = cur_open.fid;
            var cur_open_oid = cur_open.oid;
            var cur_fid = _this.model.fid;
            var cur_oid = _this.model.oid;

            console.log(">>>>>");
            console.log("cur_fid:"+cur_fid+",cur_oid:"+cur_oid)
            console.log("cur_open_fid:"+cur_open_fid+",cur_open_oid:"+cur_open_oid)
            console.log("<<<<<");


            if(cur_fid>cur_open_fid){
                return false
            }else if(cur_fid == cur_open_fid && cur_oid == cur_open_oid){
                return true
            }else{
                return true
            }

            // return true
        },
        isFolder: function() {
            return this.model.children &&
                this.model.children.length
        },
        pos_left:function(){
            return this.model.fid * this.el_W;
        },
        pos_top:function(){
            return this.cur_index*this.el_H;
        }
    },
    methods: {
        toggle: function() {
            var _this = this;
            var cur_open = {
                fid:_this.model.fid,
                oid:_this.model.oid
            }
            if (_this.isFolder) {
                _this.$store.dispatch('update_cur_open',cur_open)
            }

            _this.open = !_this.open;
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
                name: '新建stuff',
                childrenids:[],
                children:[]
            });
            console.log("==== 自己 ====");
            console.log("fid:"+_this.model.fid+";oid:"+_this.model.fid)
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
.faBox{
/*  real-width:160px;
    real-height:50px;
*/
    width: 150px;
    height: 40px;
    border-radius: 5px;
    margin: 5px;

    position: fixed;
    border: 1px solid #666;
}
</style>
