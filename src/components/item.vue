<template>
    <div class="noteCont" :style="{left:pos_left+'px',top:pos_top+'px'}">
        <div class="infoBox">
            {{model.fid}}-{{model.oid}}-{{model.id}}:{{model.name}}
        </div>
        <div class="btnBox">
            <div class="stateBtn">
                <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
                    <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
                </div>
            </div>
            <div class="addBtn">
                <div class="add" @click="addChild">添加</div>
            </div>
        </div>
        <div class="childrenCont" v-show="open" v-if="isFolder">
            <Item v-for="(model,index) in model.children" :model="model" :cur_index="index">
            </Item>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Bus from './Bus.vue'
export default {
    name: 'Item',
    props: {
        model: Object,
        cur_index: Number,
    },
    mounted: function() {
        var _this = this;
        Bus.$on('update_cur_open', function(cur_open) {
            if (_this.model.fid == cur_open.fid && _this.model.oid !== cur_open.oid) {
                if (_this.open) {
                    _this.open = !_this.open
                }
            }
        })
    },
    data() {
        return {
            el_W: 260,
            el_H: 90,
            open: false
        }
    },
    computed: {
        isFolder() {
            return this.model.children &&
                this.model.children.length
        },
        pos_left() {
            return this.model.fid * this.el_W;
        },
        pos_top() {
            return this.cur_index * this.el_H;
        }
    },
    methods: {
        toggle() {
            var _this = this;
            if (_this.isFolder) {
                var cur_open = {
                    fid: _this.model.fid,
                    oid: _this.model.oid
                }
                Bus.$emit('update_cur_open', cur_open)
                _this.open = !_this.open
            }
        },
        changeType() {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
        },
        addChild() {
            var _this = this;
            var sub_id = 0;
            if (_this.model.childrenids.length !== 0) {
                sub_id = _this.max(_this.model.childrenids) + 1;
            }
            var stmp_id = new Date().getTime().toString();
            _this.model.childrenids.push(sub_id)
            _this.model.children.push({
                fid: _this.model.fid + 1,
                oid: sub_id,
                id:stmp_id.slice(stmp_id.length-5,stmp_id.length),
                name: '新建笔记',
                childrenids: [],
                children: []
            });
        },
        max(arr) {
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
.noteCont {
    /*  real-width:260px;
        real-height:90px;
    */
    width: 250px;
    height: 80px;
    margin: 5px;
    position: fixed;
    border: 1px solid #666;
}

.noteCont .infoBox {
    width: 80%;
    height: 80px;
    float: left;
    background: #fff;
}

.noteCont .btnBox {
    width: 20%;
    height: 80px;
    float: right;
    background: #EBF5F3;
}

.noteCont .btnBox .addBtn {
    margin-top: 5px;
    width: 100%;
    height: 30px;
    text-align: center;
    color: #009A61;
    font-weight: bold;
}

.noteCont .btnBox .stateBtn {
    margin-top: 5px;
    width: 100%;
    height: 30px;
    text-align: center;
    color: #ED1C24;
    font-size: 15px;
}
</style>
