<template>
    <!-----------------------------------------------------------抽屉-->
    <div>
        <el-drawer
                :title="othertitle"
                :visible.sync="IsShowPage"
                direction="rtl"
                :before-close ="cloessb"
                size="35%">
            <div style="">
            <el-table
                    :cell-style="rowClass"
                    :header-cell-style="headClass"
                    :data="gridData2">
                <el-table-column property="goodscolorId" label="编号" width="80"></el-table-column>

                </el-table-column>
                <el-table-column
                        label="颜色名"
                        width="110">
                    <template slot-scope="scope">
                        <div>
                            <i class="main_right_item_div01_btn_i" :style="{background: 'linear-gradient(to right bottom, '+scope.row.goodscolor_linearS +', '+scope.row.goodscolor_linearE+')'}"></i>
                             {{ scope.row.goodscolorName }}
                        </div>
                    </template>
                </el-table-column>
                <!--图片-->
                <el-table-column
                        prop="picture"
                        label="展示图"
                        width="100">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 35px; height: 35px"
                                class="table-td-thumb"
                                :src="scope.row.goodscolorPicture"
                                :preview-src-list="[scope.row.goodscolorPicture]">
                            <div slot="error">
                                <el-image  fit="cover" src="static/images/shuchai/wu.png" :preview-src-list="['static/images/shuchai/wu.png']">
                                </el-image>
                            </div>
                        </el-image>
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
            <div style="margin-top: 10px;margin-left: 336px">
                <el-button type="primary" icon="el-icon-plus"  @click="add">添加展示图</el-button>
            </div>
        </div>
        </el-drawer>


        <el-dialog :title="title" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px" :rules="rules">

                <el-form-item label="颜色名:" prop="goodscolorName">
                    <el-input v-model="form.goodscolorName" placeholder="请输入颜色名字" ></el-input>
                </el-form-item>
                <!--2个颜色选择器-->
                <el-form-item label="渐变A:" prop="goodscolor_linearS">
                    <div class="block" style="text-align: left;">
                        <el-color-picker color-format="rgb" v-model="form.goodscolor_linearS"></el-color-picker>
                    </div>
                </el-form-item>

                <el-form-item label="渐变B:" prop="goodscolor_linearE">
                    <div class="block" style="text-align: left;">
                        <el-color-picker color-format="rgb" v-model="form.goodscolor_linearE"></el-color-picker>
                    </div>
                </el-form-item>


                <el-form-item label="渲染:">
                    <!--关于线性渐变的解释-->
                    <el-tooltip placement="top">
                        <div slot="content">css线性渐变,不知道的建议切腹</div>
                        <i class="el-icon-warning-outline colorexplain"></i>
                    </el-tooltip>
                    <div class="block" style="text-align: left;">
                        <i class="main_right_item_div01_btn_i" :style="{background: 'linear-gradient(to right bottom, '+form.goodscolor_linearS +', '+form.goodscolor_linearE+')'}"></i>
                        <label> {{form.goodscolorName}}</label>
                    </div>
                </el-form-item>
                <!------------------------------------------------------------------文件上传----->
                <div id="goodstype_upload_color">

                    <el-upload

                            ref='upload'
                            class="avatar-uploader"
                            action="http://localhost:8088/admin/type/goodstype/getGoodsType"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>

            </el-form>
            <span slot="footer" class="dialog-footer" >
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="goPost">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
    import { addGoodsColor } from '../../../api/goods'
    import { upload02 } from '../../../api/goods'
    import { upload03Totarget } from '../../../api/goods'
    import { upload04Tofront } from '../../../api/goods'
    import { delGoodsColor } from '../../../api/goods'
    import { deleteGoodsColorimg } from '../../../api/goods'
    import { updateGoodsColor } from '../../../api/goods'
    export default {
        data(){
            return{
                //定义一个IsShowPage来接收传递过来的值
                IsShowPage: this.isVisiblesb,
                editVisible:false,
                title: '',
                form:{},
                rules:{
                    goodscolorName: [{ required: true, message: '请输入颜色名字', trigger: 'blur' },],
                    goodscolor_linearS: [{ required: true, message: '请输入颜色名字', trigger: 'blur' },],
                    goodscolor_linearE: [{ required: true, message: '请输入颜色名字', trigger: 'blur' },],
                },
                /*图片上传*/
                imgFile:"",//这个是图片对象
                imageUrl:"",//图片路径
                addOrUpdatesb:"",
                delimg:"",
                //判断修改时有没有换图片(默认是false，如果跟更换了就是true)
                changeImg:false,

            }
        },
        created() {

        },
        methods:{
            /*提交*/
            goPost(){
                let formDatas = new FormData();
                this.$set( this.form, "goodsId", this.goods_id)
                formDatas.append("obj", JSON.stringify(this.form));
                formDatas.append("file", this.imgFile);//文件上传的参数
                if (this.addOrUpdatesb =="add"){
                        addGoodsColor(formDatas).then(res => {
                            if (res){
                                // 触发父组件中的事件，并传递参数
                                this.$emit('getDatasb',this.goods_id);
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!',
                                    duration:2000
                                });
                                this.editVisible =false;
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '添加失败!',
                                    duration:2000
                                });
                            }

                    })

                } else {
                    let formDatas2 = new FormData();
                    //false就是没有修改图片
                    if (this.changeImg==false){
                        formDatas.append("type", 2);
                        updateGoodsColor(formDatas).then(res => {
                            if (res){
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功!',
                                    duration:2000
                                });
                                //删除服务器的旧图片
                                deleteGoodsColorimg(formDatas2).then(res => {
                                })
                                // 触发父组件中的事件，并传递参数
                                this.$emit('getDatasb',this.goods_id);
                                this.editVisible =false;

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '编辑失败!',
                                    duration:2000
                                });
                            }
                        })
                    } else {
                        formDatas2.append("delete", this.delimg);
                        formDatas.append("type", 1);
                            updateGoodsColor(formDatas).then(res => {
                                if (res){
                                    this.$message({
                                        type: 'success',
                                        message: '编辑成功!',
                                        duration:2000
                                    });
                                    //删除服务器的旧图片
                                    deleteGoodsColorimg(formDatas2).then(res => {
                                    })
                                    // 触发父组件中的事件，并传递参数
                                    this.$emit('getDatasb',this.goods_id);
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


                };

            },
            /*删除*/
            otherhandleDelete(index, row){
                let formDatas = new FormData();
                formDatas.append("goodscolorId", row.goodscolorId);
                formDatas.append("delete", row.goodscolorPicture);
                this.$confirm("确认要删除此展示图吗？", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "info",
                    dangerouslyUseHTMLString: true,
                }).then(() => {
                    //删除服务器的旧图片
                    deleteGoodsColorimg(formDatas).then(res => {
                    })
                    delGoodsColor(formDatas).then(res => {
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
            /*---------------------编辑*/
            otherhandleEdit(index, row){
                this.addOrUpdatesb = "update";
                this.title = "编辑";
                this.editVisible = true;
                this.form = row;
                this.imageUrl = row.goodscolorPicture;
                this.delimg = row.goodscolorPicture;
            },
            // 重置表单项属性
            resetForm () {
                this.form = {
                    goodscolorName:"",
                }
                this.imageUrl=""
            },
            /*---------------------添加*/
            add(){
                this.resetForm();
                this.addOrUpdatesb = "add";
                this.title = "添加展示图";
                this.editVisible =true;
            },
            cloessb(){
                this.IsShowPage = false;
                // 触发父组件中的dialogVisibleEvent事件，并传递参数
                this.$emit('dialogVisibleEvent', false);
            },
            // 表头样式设置
            headClass () {
                return 'text-align: center;'
            },
            // 表格样式设置
            rowClass () {
                return 'text-align: center;'
            },
            /*-------------------------------------------------------------------文件上传操作---*/
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {

                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                this.changeImg = true;
                this.imgFile = file;//吧文件对面传给全局属性
                return isJPG && isLt2M;
            },
        },
        props: {
            /*抽屉*/
            isVisiblesb:false,
            othertitle:"",
            gridData2:{},
            goods_id:"",
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

<style>
    .colorexplain{
        position: absolute;
        left: -65px;
        top: 9px;
    }
    .main_right_item_div01_btn_i{
        position: relative;
        display: inline-block;
        background-color: transparent;
        vertical-align: middle;
        margin-top: -5px;
        margin-right: 0;
        border-radius: 50%;
        width: 16px;
        height: 16px;
    }
    /*------------------------------------文件上传的样式----*/
    #goodstype_upload_color{
        margin-left: -30px;
    }
    .el-upload--text {
        color: #97a8be;
        font-size: 14px;
        text-align: center;
        width: 200px !important;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 100%;
        height: auto;
        display: block;
    }
</style>
