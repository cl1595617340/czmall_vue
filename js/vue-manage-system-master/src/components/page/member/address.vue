<template>
<div>
    <el-dialog  :visible.sync="IsShowPage" :title="othertitle"  :before-close ="cloessb">

        <el-table
                :data="gridData"
                style="width: 100%"
                height="250">
            <el-table-column
                    fixed
                    prop="addressId"
                    label="地址ID"
                    width="70">
            </el-table-column>
            <el-table-column
                    prop="addressName"
                    label="收货人"
                    width="120">
            </el-table-column>

            <el-table-column
                    label="默认地址"
                    width="110">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <p v-if="scope.row.addressDefault==0">
                            <el-tag size="medium">是</el-tag>
                        </p>
                        <p v-if="scope.row.addressDefault==1">
                            <el-tag size="medium" type="danger">否</el-tag>
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="addressIpone"
                    label="收货手机号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="addressProvince"
                    label="地址-省"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="addressCity"
                    label="地址-市"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="addressCounty"
                    label="地址-区"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="addressinfo"
                    label="详细地址"
                    width="120">
            </el-table-column>


        </el-table>
    </el-dialog>
</div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                //定义一个IsShowPage来接收传递过来的值
                IsShowPage: this.isVisiblesb,
                editVisible: false,
            }
        },
        methods:{
            cloessb(){
                this.IsShowPage = false;
                // 触发父组件中的dialogVisibleEvent事件，并传递参数
                this.$emit('dialogVisibleEvent', false);
            },
        },
        props: {
            isVisiblesb: false,
            othertitle:"",
            gridData:{},
        },
        watch: {
            isVisiblesb: {
                handler(newVal, oldVal) {
                    this.IsShowPage = newVal;
                }
            }
        }
    }
</script>

<style scoped>

</style>
