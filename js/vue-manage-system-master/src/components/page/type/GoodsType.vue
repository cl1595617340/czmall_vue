<template>
    <div id="goodstype_mian">
        <div class="goodstype_mian_div">
            <el-button type="primary" @click="showAddType()">添加类别</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                v-loading="loading"
                :cell-style="rowClass"
                :header-cell-style="headClass"
                :tree-props="{children: 'childrensb', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="id"
                    label="类目ID"
                    sortable
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="类目名"
                    width="180">
                <template scope="scope">
                    <p v-if="scope.row.typename=='1级类目'"  style="font-weight: 900;font-size: 14px">{{scope.row.name}}</p>
                    <p v-if="scope.row.typename=='2级类目'"  style="font-weight: 500;font-size: 12px">{{scope.row.name}}</p>
                    <p v-if="scope.row.typename=='3级类目'"  style="font-weight: 200;font-size: 10px">{{scope.row.name}}</p>
                </template>
            </el-table-column>


            <!--图片-->
            <el-table-column
                    prop="picture"
                    label="类目图片"
                    width="200">
                <template slot-scope="scope">
                    <el-image
                            style="width: 35px; height: 35px"
                            class="table-td-thumb"
                            :src="scope.row.picture"
                            :preview-src-list="[scope.row.picture]">
                        <div slot="error">
                            <el-image  fit="cover" src="static/images/shuchai/wu.png" :preview-src-list="['static/images/shuchai/wu.png']">
                            </el-image>
                        </div>
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column
                    prop="state"
                    label="类目状态">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.state"
                            :active-value= 0
                            :inactive-value= 1
                            @change="changeSwitch(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="typename"
                    label="类目级别">
                <template scope="scope">
                    <el-tag v-if="scope.row.typename=='1级类目'" type="success">1级类目</el-tag>
                    <el-tag v-if="scope.row.typename=='2级类目'" type="warning">2级类目</el-tag>
                    <el-tag v-if="scope.row.typename=='3级类目'" type="info">3级类目</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
            <div style="color: indianred">

            </div>
        </el-table>

        <!-- ----------------------------------------------------------------------编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="35%">
            <el-form ref="form" label-width="70px">

                <el-form-item label="类目名">
                    <el-input v-model="formname"></el-input>
                </el-form-item>

                <el-form-item label="级别">
                    <el-select v-model="optionvalue" :disabled="disabled0" placeholder="请选择" @change="selectGet" >
                        <el-option
                                v-for="item in optionstype"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="1级父类">
                    <el-select v-model="optionvalue1" :disabled="disabled1" placeholder="请选择" @change="selectGet01">
                        <el-option
                                v-for="item in optionstype1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="2级父类">
                    <el-select v-model="optionvalue2" :disabled="disabled2" placeholder="请选择">
                        <el-option
                                v-for="item in optionstype2"
                                :key="item.goodstype2Id"
                                :label="item.goodstype2Name"
                                :value="item.goodstype2Id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <!------------------------------------------------------------------文件上传----->
                <div id="goodstype_upload" v-if="show_upload">

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
    import { getGoodsType } from '../../../api/goodstype'
    import { updateTypestate } from '../../../api/goodstype'
    import { getGoodsType2Byid } from '../../../api/goodstype'
    import { upload02 } from '../../../api/goodstype'
    import { addType } from '../../../api/goodstype'
    import { getGoodstypeBy2 } from '../../../api/goodstype'
    import { getGoodstype2By3 } from '../../../api/goodstype'
    import { updateType } from '../../../api/goodstype'
    import { upload03Totarget } from '../../../api/goodstype'
    import { upload04Tofront } from '../../../api/goodstype'
    import { deletesb } from '../../../api/goodstype'
    export default {
        data() {
            return {
                tableData: [],
                loading:true,
                statevalue:true,

                formname:"",
                editVisible:false,
                title:"编辑",
                /*第一个类目级别的下拉框*/
                optionstype:[{
                    value: '1',
                    label: '1级类目'
                },{
                    value: '2',
                    label: '2级类目'
                },{
                    value: '3',
                    label: '3级类目'
                }],
                optionvalue: '',

                /*第2个1级父类的下拉框*/
                optionstype1:[],
                optionvalue1: '',
                disabled2:true,
                disabled1:true,
                disabled0:false,

                /*第3个2级父类的下拉框*/
                optionstype2:[],
                optionvalue2: '',

                imageUrl: '',
                show_upload:false,
                /*要上传的文件对象*/
                imgFile:'',
                formData: new FormData(),
                //判断是新增还是修改
                addOrUpdate:"",
                //记录分类id
                updateType01Id:"",
                //修改3级分类他2级分类的sid(关联2级分类的外键)
                updateGoodstype2IdTo3:"",
                //判断修改时有没有换图片(默认是false，如果跟更换了就是true)
                changeImg:false,
                deleteImgUrl:'',
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取数据
            getData(){
                getGoodsType().then(res => {

                    this.tableData = res.atreeGoodsList;//把传回来数据赋给表格

                    this.optionstype1 = res.atreeGoodsList;
                    console.log(res.atreeGoodsList)
                    this.loading = false;
                })
            },
            /*--------------------------------------------------------------------监听switch开关*/
            changeSwitch(data){

                let type02List = [];
                let type02Listid = [];
                if (data.childrensb!=null){
                    type02List = data.childrensb;
                    type02Listid = new Array();//装2级分类的id数组，给后台的3级分类批量修改状态用
                    for (const any of data.childrensb) {
                        type02Listid.push(any.id)
                    }
                } ;


               /* let formDatas = new FormData()
                formDatas.append("idss", type02Listid);
                updatesb(formDatas).then(res => {

                })*/

                let type ="";//根据状态判断是启用还是禁用
                let typeToAamin = 0;//传到后台的state
                let typeconfirm ="";//根据状态提示框的小图标
                let content = '';//提示框的内容
                if (data.state==0){
                    type="<lable style=\"color: blue\">启用</lable>";
                    typeconfirm="warning";
                    typeToAamin = 0;
                }else {
                    type="<lable style=\"color: red\">禁用</lable>";
                    typeconfirm="info";
                    typeToAamin = 1;
                }

                /*alert(data.typename)*/
                if (data.typename=="1级类目"){
                    content ='确定要'+type+'1级类目吗？，此分类下的所有分类都会被禁用，请谨慎操作.';
                }else if (data.typename=="2级类目"){
                    content ='确定要'+type+'2级类目吗？，此分类下的所有分类都会被禁用，请谨慎操作.';
                }else {
                    content ='确定要'+type+'3级类目吗？';
                }

                this.$confirm(content, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: typeconfirm,
                    dangerouslyUseHTMLString: true,
                    center: true
                }).then(() => {
                    /*传到后台的参数*/
                    let formDatas = new FormData()
                    if (data.typename=="1级类目"){
                        formDatas.append("type", 1);
                        formDatas.append("id", data.id);
                        formDatas.append("state", typeToAamin);
                        formDatas.append("idss", type02Listid);

                    }else if (data.typename=="2级类目"){
                        formDatas.append("type", 2);
                        formDatas.append("id",data.id);
                        formDatas.append("state", typeToAamin);
                    }else {
                        formDatas.append("type", 3);
                        formDatas.append("id", data.id);
                        formDatas.append("state", typeToAamin);
                    }
                    /*执行修改操作*/
                    updateTypestate(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:2000
                            });
                            this.getData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '操作失败!',
                                duration:2000
                            });
                        }
                    })

                    /*取消按钮*/
                }).catch(() => {
                    data.state = 0;//点击取消后开关不会变
                });
            },

            /*选择3级分类时，根据1级分类动态加载2级分类*/
            selectGet01(){
                this.optionvalue2 = "";

                let param = new URLSearchParams();
                param.append("id",this.optionvalue1);
                getGoodsType2Byid(param).then(res => {
                    this.optionstype2 = res.Goodstype2List;
                    console.log(res.Goodstype2List)
                })
            },

           /*第一个下拉框，根据用户的选择动态禁用下拉框*/
            selectGet(){
                //如果选择的是1及分类，其他分类下拉框禁用
               if (this.optionvalue==1){
                   this.show_upload = false;
                   this.disabled2 = true;
                   this.disabled1 = true;
                   //如果选择的是2及分类，2级分类下拉框禁用
               } else if (this.optionvalue==2){
                   this.show_upload = false;
                   this.disabled1 = false;
                   this.disabled2 = true;
                   //如果选择的是3及分类，其他分类下拉框启用(图片上传s出现)
               } else{
                   this.show_upload = true;
                   this.disabled2 = false;
                   this.disabled1 = false;
               };
            },

            /*打开添加窗口*/
            showAddType(){
                this.formname = "";
                this.clearSelect();
                this.editVisible = true;
                this.title="新增";
                this.addOrUpdate = "add";
                this.show_upload = false;

                this.disabled0 = false;
                this.disabled1 = false;
                this.disabled2 = false;
            },

            /*清理下拉框的通用方法*/
            clearSelect(){
                this.optionvalue = "";
                this.optionvalue1 = "";
                this.optionvalue2 = "";
            },
            // 编辑按钮，打开修改窗口赋值
            handleEdit(index, row) {
                //不让用户修改级别
                this.disabled0 = true;
                this.updateType01Id = row.id;
                this.addOrUpdate = "update";
                //每次进来修改前清理下拉框数据
                this.clearSelect();

                this.title="编辑";
                this.formname = row.name;
                this.optionvalue = row.typename;//----------错吧label传给了value，不过可以用

                //如果选择的是1及分类，其他分类下拉框禁用
                if (this.optionvalue=="1级类目"){
                    this.show_upload = false;
                    this.disabled2 = true;
                    this.disabled1 = true;

                    //如果选择的是2及分类，2级父类下拉框禁用
                } else if (this.optionvalue=="2级类目"){

                    let param = new URLSearchParams();
                    param.append("id",row.id);
                    getGoodstypeBy2(param).then(res => {
                        this.optionvalue1 = res.goodstype.goodstypeId;
                    })

                    this.show_upload = false;
                    this.disabled1 = false;
                    this.disabled2 = true;

                    //如果选择的是3及分类，其他分类下拉框启用(图片上传s出现)
                } else{

                    let param = new URLSearchParams();
                    param.append("id",row.id);
                    //拿到2级分类
                    getGoodstype2By3(param).then(res => {
                        this.optionvalue2 = res.goodstype2.goodstype2Name;
                        this.updateGoodstype2IdTo3 = res.goodstype2.goodstype2Id;
                        //再拿1分类
                        let param2 = new URLSearchParams();
                        param2.append("id",res.goodstype2.goodstype2Id);
                        getGoodstypeBy2(param2).then(res => {
                            this.optionvalue1 = res.goodstype.goodstypeId;
                        })
                    })
                    this.imageUrl = row.picture;
                    //修改图片要删除他上一个图片
                    this.deleteImgUrl = row.picture;
                    console.log( this.deleteImgUrl)
                    this.show_upload = true;
                    this.disabled2 = false;
                    this.disabled1 = false;
                };

                this.editVisible = true;
                console.log(row);
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
                this.imgFile = file;//吧文件对面传给全局属性
                this.changeImg = true;
                return isJPG && isLt2M;
            },

            /*-----------------------------------------------------------------表单提交的按钮方法*/
            goPost(){
                /*新增,新增这里图片有个bug，如果先修改图片会缓存，所以在这里要判断下用户有没有点击跟换图片*/
                if (this.addOrUpdate=="add"){
                    if (this.imgFile==""&&this.optionvalue==3){
                        this.$message('图片会有缓存，请点击选择图片');
                        return;
                    } ;

                    let formDatas = new FormData()
                    //根据下拉框的级别去传递相应的参数
                    if (this.optionvalue==1){
                        formDatas.append("type", 1);
                        formDatas.append("name", this.formname);
                        formDatas.append("sid", 0);
                        formDatas.append("file", null);
                    } else if (this.optionvalue==2){
                        formDatas.append("type", 2);
                        formDatas.append("name", this.formname);
                        formDatas.append("sid", this.optionvalue1);
                        formDatas.append("file", null);
                    } else{
                        formDatas.append("type", 3);
                        formDatas.append("name", this.formname);
                        formDatas.append("sid", this.optionvalue2);
                        formDatas.append("file", this.imgFile);

                        let formDatas02 = new FormData()
                        formDatas02.append("file", this.imgFile);
                      /*  upload02(formDatas02).then(res => {
                           /!* upload03Totarget(formDatas02).then(res => {
                            })
                            upload04Tofront(formDatas02).then(res => {
                            })*!/
                        })
*/

                    };

                    /*  console.log(this.formData)*/
                    /*调用文件上传的接口*/
                    addType(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '新增成功!',
                                duration:2000
                            });
                            //新增ok后窗口关闭
                            this.editVisible = false;
                            //新增ok后刷新数据
                            this.getData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '新增失败!',
                                duration:2000
                            });
                        }
                    });

                    /*---------------------------------------------------修改*/
                } else {
                    let formDatas = new FormData();
                    /*alert(this.updateType01Id)*/
                    //如果级别下拉框处于禁用，就说明是修改1级分类操作

                    if (this.optionvalue=="1级类目"){
                        formDatas.append("type", 1);
                        formDatas.append("name", this.formname);
                        formDatas.append("id", this.updateType01Id);
                        /*   formDatas.append("file", null);
                           formDatas.append("sid", null);*/

                        //如果类别是2并且3级类别被禁用,就是2级分类的修改操作
                    } else if (this.optionvalue=="2级类目"&&this.disabled2 == true){
                        formDatas.append("type", 2);
                        formDatas.append("name", this.formname);
                        formDatas.append("id", this.updateType01Id);
                        formDatas.append("file", null);
                        formDatas.append("sid", this.optionvalue1);
                    } else{

                        formDatas.append("type", 3);
                        formDatas.append("name", this.formname);
                        formDatas.append("id", this.updateType01Id);
                        formDatas.append("sid", this.updateGoodstype2IdTo3);

                        //false就是没有修改图片
                        if (this.changeImg==false){
                            formDatas.append("file", null);
                        } else {

                            formDatas.append("file", this.imgFile);

                            let formDatas02 = new FormData()
                            formDatas02.append("file", this.imgFile);
                            formDatas02.append("delete", this.deleteImgUrl);
                            //修改图片前要先删除他的上一个图片
                            deletesb(formDatas02).then(res => {

                            })
                           /* upload02(formDatas02).then(res => {

                            })
                            upload03Totarget(formDatas02).then(res => {

                            })
                            upload04Tofront(formDatas02).then(res => {
                            })*/
                        };

                    };

                    updateType(formDatas).then(res => {
                            if (res){
                            this.$message({
                                type: 'success',
                                message: '编辑成功!',
                                duration:2000
                            });
                                //新增ok后刷新数据
                              this.getData();
                            this.imgFile="";
                            //新增ok后窗口关闭
                            this.editVisible = false;

                        } else {
                            this.$message({
                                type: 'error',
                                message: '编辑失败!',
                                duration:2000
                            });
                        }
                    });
                };

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
    }
</script>

<style>

    .goodstype_mian_div{
        width: 100%;
        height: 40px;
        margin-left: 2px;
    }
#goodstype_mian{
   /* background: red;
    width: 100%;
    height: 100%;*/
}

    /*------------------------------------文件上传的样式----*/
    #goodstype_upload{
        margin-left: 70px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 200px !important;
        margin: 0 auto;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        line-height: 200px;
        text-align: center;
    }
    .avatar {
        width: 200px;
        height: 200px;
        display: block;
    }

</style>
