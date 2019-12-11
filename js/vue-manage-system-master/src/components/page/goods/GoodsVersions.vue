<template>
    <!-----------------------------------------------------------抽屉-->
    <div>
        <el-drawer
                :title="othertitle"
                :visible.sync="IsShowPage"
                direction="rtl"
                :before-close ="cloessb"
                @open="opensb"
                size="40%">
            <div style="">
                <el-table
                        :cell-style="rowClass"
                        :header-cell-style="headClass"
                        :data="gridData">
                    <el-table-column property="versionsId" label="编号" width="80"></el-table-column>
                    <el-table-column property="versionsName" label="容量" width="100"></el-table-column>
                    <el-table-column property="versionsPrice" label="价格(￥)" width="80"></el-table-column>
                    <el-table-column
                            v-if="showtag"
                            label="标签"
                            width="110">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.versions_tab }}</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="otherhandleEdit(scope.$index, scope.row)">编辑</el-button>

                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="otherhandleDelete(scope.$index, scope.row)">删除</el-button>


                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 10px;margin-left: 422px;">
                    <el-button type="primary" icon="el-icon-plus"  @click="add">添加版本</el-button>
                </div>




            </div>
        </el-drawer>

        <el-dialog :title="title" :visible.sync="editVisible" width="25%">
            <el-form ref="form" :model="form" label-width="70px" :rules="rules">


                <el-form-item label="版本名:" prop="versionsName">
                    <el-input v-model="form.versionsName" placeholder="请选择版本名" ></el-input>
                </el-form-item>
                <el-form-item label="价格:" prop="versionsPrice">
                    <el-input v-model="form.versionsPrice" placeholder="请选择价格(￥)"></el-input>
                </el-form-item>

                <el-form-item class="form_item" label="标签:" v-if="showtag">
                    <el-select style="width: 200px" v-model="form.versions_tab" placeholder="请选择">
                        <el-option
                                v-for="item in tablist"
                                :key="item.text"
                                :label="item.text"
                                :value="item.text">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer" >
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="goPost">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>

    import { updateVersions } from '../../../api/goods'
    import { addVersions } from '../../../api/goods'
    import { deleteVersions } from '../../../api/goods'
    export default {
        data(){
            return{
                /*除了手机，其他商品都没有标签列*/
                showtag:true,
                //定义一个IsShowPage来接收传递过来的值
                IsShowPage: this.isVisiblesb,
                editVisible:false,
                form:{

                },
                title:"",
                rules:{
                    versionsName: [{ required: true, message: '请输入容量,注意空格', trigger: 'blur' },],
                    versionsPrice: [{ required: true, message: '请输入价钱', trigger: 'blur' },],
                },
                addOrUpdatesb:'',
                visible: false,
                tablist:[
                    {text:"极速畅玩"},
                    {text:"高速"},
                    {text:"流畅"},
                    {text:"实用"},
                ]
            }
        },

        methods:{
            opensb(){
              if (this.typename!='手机'){
                  this.showtag = false;
              } else {
                  this.showtag = true;
              };
            },
            /*提交表单*/
            goPost(){
                let formDatas = new FormData();
                this.$set( this.form, "goodsId", this.goods_id)
                formDatas.append("obj", JSON.stringify(this.form));
                if (this.addOrUpdatesb == "add") {
                    addVersions(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '添加成功!',
                                duration:2000
                            });
                            // 触发父组件中的事件，并传递参数
                            this.$emit('getDatasb',this.goods_id);
                            this.editVisible =false;
                        } else {
                            this.$message({
                                type: 'error',
                                message: '添加失败!',
                                duration:2000
                            });
                        }
                    })
                }else {
                    updateVersions(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '编辑成功!',
                                duration:2000
                            });

                            this.editVisible =false;
                        } else {
                            this.$message({
                                type: 'error',
                                message: '编辑失败!',
                                duration:2000
                            });
                        }
                    })
                };

            },

            // 重置表单项属性
            resetForm () {
                this.form = {
                    versionsName:"",
                    versionsPrice:"",
                }
            },

            /*添加*/
            add(){
                this.resetForm();
                this.addOrUpdatesb = "add";
                this.title = "添加版本",
                this.editVisible =true;
            },
            cloessb(){
                this.IsShowPage = false;
                // 触发父组件中的dialogVisibleEvent事件，并传递参数
                this.$emit('dialogVisibleEvent', false);
            },
            /*编辑*/
            otherhandleEdit(index, row){
                this.addOrUpdatesb = "update";
                this.title = "编辑",
                this.editVisible = true;
                this.form = row;
            },
            /*删除*/
            otherhandleDelete(index, row){
                let formDatas = new FormData();
                formDatas.append("versionsId", row.versionsId);

                this.$confirm("确认要删除此版本吗？", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "info",
                    dangerouslyUseHTMLString: true,
                }).then(() => {
                    deleteVersions(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:2000
                            });
                            // 触发父组件中的事件，并传递参数
                            this.$emit('getDatasb',this.goods_id);
                            this.editVisible =false;
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!',
                                duration:2000
                            });
                        }
                    })
                    /*取消按钮*/
                }).catch(() => {

                });

            },
            // 表头样式设置
            headClass () {
                return 'text-align: center;'
            },
            // 表格样式设置
            rowClass () {
                return 'text-align: center;'
            },
        },
        props: {
            isVisiblesb:false,
            othertitle:"",
            gridData:{},
            goods_id:"",
            typename:"",
        },
        watch: {
            isVisiblesb: {
                handler(newVal, oldVal) {
                    this.IsShowPage = newVal;
                }
            }
        },
    };
</script>

<style scoped>

</style>
