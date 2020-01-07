<template>
    <div style="background: white;text-align: center;width: 100%">
        <div class="container">
            <!--专区名字-->
            <div class="generalize_mian">
                <p>
                    <label style="font-weight: 700;position: relative;top: -8px;">专区名</label>
                    <label style="font-weight: 700;position: relative;top: -8px;left: 125px">操作</label>
                </p>
                <p  v-for="(site,index) in generalizelist">
                    <label :class="site.generalizeStatesb==1?generalizeStatesb:''" style="cursor: pointer;display: inline-block;width: 160px;" @click="switchGeneralize(site.generalizeId,site.generalizeName)" :style="generalizesbb==site.generalizeId?activeColor:activeColorsb">{{site.generalizeName}}</label>

                    <i @click="updategeneralizeStatebb(site.generalizeId,site.generalizeStatesb)" v-if="site.generalizeStatesb==1" class="el-icon-circle-check sbisb" style="margin-left: 5px"></i>
                    <i @click="updategeneralizeStatebb(site.generalizeId,site.generalizeStatesb)" v-if="site.generalizeStatesb==0" class="el-icon-circle-close sbisb" style="margin-left: 5px"></i>

                    <i @click="updategeneralize(site.generalizeId,site.generalizeName)" class="el-icon-s-tools sbisb" style="margin-left: 5px"></i>
                </p>

                <div class="generalize_mian_btn">
                    <el-button @click="addgeneralize()" type="primary" icon="el-icon-circle-plus-outline">添加专区</el-button>
                </div>

                <!--一个输入框-->
                <transition name="mian_input_show">
                    <div class="generalize_mian_input" v-if="mian_input">
                        <el-input @keyup.enter.native="gosubmit()" v-model="generalizeinput"></el-input>
                    </div>
                </transition>
            </div>

            <!----------------------------------------------------------表格----->
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    :cell-style="rowClass"
                    :header-cell-style="headClass"
                    style="width: 80%;margin-left: 80px">
                <el-table-column prop="generalizeRelationId" label="ID" width="60"></el-table-column>

                <el-table-column prop="goods.goodsName" label="商品名字" width="120"></el-table-column>

                <!--封面图-->
                <el-table-column
                        prop="generalizeGoodsImg"
                        label="封面图"
                        width="112">
                    <template slot-scope="scope">
                        <p v-if="scope.row.generalize_type==1">
                            <el-image
                                    style="width: 35px; height: 35px"
                                    class="table-td-thumb"
                                    :src="scope.row.generalizeGoodsImg"
                                    :preview-src-list="[scope.row.generalizeGoodsImg]">
                                <div slot="error">
                                    <el-image  fit="cover" src="static/images/shuchai/wu.png" :preview-src-list="['static/images/shuchai/wu.png']">
                                    </el-image>
                                </div>
                            </el-image>
                        </p>
                        <p v-if="scope.row.generalize_type==0">
                            <p v-for="(site3,index3) in scope.row.goods.goodscolorList" v-if="index3==0&&scope.row.generalize_type==0">
                                <el-image
                                        style="width: 35px; height: 35px"
                                        class="table-td-thumb"
                                        :src="site3.goodscolorPicture"
                                        :preview-src-list="[site3.goodscolorPicture]">
                                    <div slot="error">
                                        <el-image  fit="cover" src="static/images/shuchai/wu.png" :preview-src-list="['static/images/shuchai/wu.png']">
                                        </el-image>
                                    </div>
                                </el-image>
                             </p>
                        </p>
                    </template>
                </el-table-column>

                <el-table-column
                        label="封面图类型"
                        width="110">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <p v-if="scope.row.generalize_type==1">
                                <el-tag size="medium">大图</el-tag>
                            </p>
                            <p v-if="scope.row.generalize_type==0">
                                <el-tag size="medium" type="danger">小图</el-tag>
                            </p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="goods.goodsId" label="商品id" width="60"></el-table-column>


                <el-table-column label="商品价格" width="80px" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <p  v-for="(site3,index3) in scope.row.goods.versionsList" v-if="index3==0">
                            <!--<p>{{site3.versionsPrice}}</p>-->
                            <label>￥{{site3.versionsPrice}}.00</label>
                        </p>
                    </template>
                </el-table-column>



                <el-table-column
                        label="商品简介"
                        width="140">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.goods.goodsDescribe }}</p>
                            <div slot="reference" class="name-wrapper" style="cursor: pointer">
                                <el-tag size="medium">这里看商品简介</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>


                <el-table-column label="操作" width="186">
                    <template slot-scope="scope">

                        <span>
                            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">
                                <i class="el-icon-delete"></i>
                                删除</el-button>
                            <!--地址-->
                            <el-button size="mini" @click="updatesb(scope.$index, scope.row)">
                                <i class="el-icon-edit-outline"></i>
                                修改</el-button>
                        </span>

                    </template>
                </el-table-column>

            </el-table>
        </div>
        <!--添加专区的商品按钮-->
        <div class="addGoods">
            <div class="generalize_mian_btnsb">
                <el-button @click="addGeneralizeGoods" type="primary" icon="el-icon-circle-plus-outline">在{{generalizeName}}添加商品</el-button>
            </div>
        </div>
        <!-- ----------------------------------------------------------------------编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="35%">
            <el-form ref="form" label-width="140px">

                <el-form-item label="关联商品" v-show="showgoods" >
                    <el-select v-model="goodsvalue"  placeholder="请选择">
                        <el-option
                                v-for="item in goodslist"
                                :key="item.goodsId"
                                :label="item.goodsName"
                                :value="item.goodsId">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="图片类型">
                    <el-select v-model="optionvalue" :disabled="disabled0" placeholder="请选择" @change="selectGet" >
                        <el-option
                                v-for="item in optionstype"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 100%;height: auto">
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
    import { getAllgeneralize } from '../../../api/generalize'
    import { getGeneralizeById } from '../../../api/generalize'
    import { updateGeneralizerelation } from '../../../api/generalize'
    import { deletesb } from '../../../api/generalize'
    import { addGeneralizerelation } from '../../../api/generalize'
    import { delGeneralizeGoods } from '../../../api/generalize'

    import { addGeneralize } from '../../../api/generalize'
    import { updateGeneralize } from '../../../api/generalize'
    import { updateGeneralizeState } from '../../../api/generalize'
    export default {

        data() {
            return {
                //专区的商品数据
                tableData: [],
                loading:true,
                //专区数据
                generalizelist:[],
                //专区id
                generalizeid:-1,
                //专区名字
                generalizeName:"",
                /*修改属性*/
                editVisible:false,
                optionstype:[
                    {value:0,label:"小图"},
                    {value:1,label:"大图"},
                ],
                optionvalue:"",
                disabled0:false,
                /*------------文件上传----*/
                imageUrl: '',
                show_upload:false,
                /*要上传的文件对象*/
                imgFile:'',
                /*修改要删除原图片*/
                delimg:"",
                //判断修改时有没有换图片(默认是false，如果跟更换了就是true)
                changeImg:false,
                title:"",
                //修改要的专区关系id
                generalize_relation_id:-1,
                /*--------关联的商品---*/
                goodslist:[],
                goodsvalue:"",
                /*判断是新增还是修改*/
                addOrUpdate:"",
                showgoods:false,
                /*点击专区的属性*/
                generalizesbb:-1,
                activeColor:"color:red",
                activeColorsb:"",
                /*输入框的值*/
                generalizeinput:"回车确定",
                mian_input:false,
                mian_input_i:0,
                mian_input_i2:0,
                /*专区判断是新增还是修改*/
                addOrUpdatesb:"",
                generalizeIdssb:"",
                /*停用专区的class*/
                generalizeStatesb:"generalizeStatesb",
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData(){
                getAllgeneralize().then(res => {
                    this.generalizelist = res.res;
                    this.goodslist = res.goodsList;

                    console.log(res.res);
                    //拿到第一个专区的id
                    let i = 0;
                    for (const re of this.generalizelist) {
                       i++;
                       if (i==1){
                           this.generalizesbb =  re.generalizeId;
                           this.generalizeid =  re.generalizeId;
                           this.generalizeName = re.generalizeName;
                           let formDatas = new FormData();
                           formDatas.append("ID",this.generalizeid);
                           getGeneralizeById(formDatas).then(resb => {
                              this.tableData = resb.res.generalizeRelationList;
                              this.loading = false;
                           })
                       } ;
                    }
                })
            },
            /*启用停用*/
            updategeneralizeStatebb(id,statesb){
                let state = -1;
                if (statesb==0){
                    state = 1;
                } else {
                    state = 0;
                };
                let formDatas = new FormData();
                formDatas.append("id",id);
                formDatas.append("state",state);
                updateGeneralizeState(formDatas).then(res => {
                    if (res.res){
                        this.$message({
                            type: 'success',
                            message: '修改成功!',
                            duration:2000
                        });
                        this.editVisible =false;
                        this.getData();
                        this.switchGeneralize(this.generalizeid);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败!',
                            duration:2000
                        });
                    }
                })
            },
            /*修改专区*/
            updategeneralize(id,name){
                this.generalizeIdssb = id;
                this.addOrUpdatesb = "update";
                this.generalizeinput = name;
                if (this.mian_input_i2==0){
                    this.mian_input = true;
                    this.mian_input_i2++;
                } else {
                    this.mian_input = false;
                    this.mian_input_i2--;
                };
            },
            /*回车确认值*/
            gosubmit(){
                if (this.generalizeinput==""){
                    return;
                } ;
                let data = {
                    generalizeName:this.generalizeinput,
                };
                let formDatas = new FormData();

                if (this.addOrUpdatesb=='update'){
                    this.$set(data, "generalizeId", this.generalizeIdssb)
                    formDatas.append("obj", JSON.stringify(data));
                    updateGeneralize(formDatas).then(res => {
                        if (res.res){
                            this.$message({
                                type: 'success',
                                message: '修改成功!',
                                duration:2000
                            });
                            this.editVisible =false;
                            this.getData();
                            this.switchGeneralize(this.generalizeid);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '修改失败!',
                                duration:2000
                            });
                        }
                    })
                } else {
                    formDatas.append("obj", JSON.stringify(data));
                    addGeneralize(formDatas).then(res => {
                        if (res.res){
                            this.$message({
                                type: 'success',
                                message: '添加成功!',
                                duration:2000
                            });
                            this.editVisible =false;
                            this.getData();
                            this.switchGeneralize(this.generalizeid);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '添加失败!',
                                duration:2000
                            });
                        }
                    })
                };

            },
            /*点击添加专区出现输入框*/
            addgeneralize(){
                this.generalizeinput = "回车确定";
                this.addOrUpdatesb = "add";
                if (this.mian_input_i==0){
                    this.mian_input = true;
                    this.mian_input_i++;
                } else {
                    this.mian_input = false;
                    this.mian_input_i--;
                };

            },
            /*-----------------------------------------------------------上面专区内容---*/
            //--------------------点击专区名切换表格数据
            switchGeneralize(id,name){
                this.generalizesbb = id;
                this.loading = true;
                this.generalizeid = id;
                this.generalizeName  = name;
                let formDatas = new FormData();
                formDatas.append("ID",this.generalizeid);
                getGeneralizeById(formDatas).then(resb => {
                    console.log(resb.res);
                    if (resb.res==undefined){
                        this.tableData = "";
                        this.loading = false;
                    } else {
                        this.tableData = resb.res.generalizeRelationList;
                        this.loading = false;
                    };

                })
            },
            /*清除数据的方法*/
            clearform(){
                this.optionvalue = "";
                this.goodsvalue = "";
                this.imageUrl = "";
            },
            /*修改商品按钮*/
            updatesb(index, row){
                this.showgoods = false;
                this.addOrUpdate = "update";
                console.log(row);
                this.title = "修改"+row.goods.goodsName+"的专区图片";
                this.optionvalue = row.generalize_type;
                this.imageUrl = row.generalizeGoodsImg;
                this.delimg = row.generalizeGoodsImg;
                //赋值修改要的专区关系id
                this.generalize_relation_id = row.generalizeRelationId;
                if (this.optionvalue == 1){
                    this.show_upload = true;
                } else{
                    this.show_upload = false;
                };
                this.editVisible=true;
            },
            /*添加商品按钮*/
            addGeneralizeGoods(){
                this.showgoods = true;
                this.addOrUpdate = "add";
                this.clearform();
                this.editVisible=true;
                this.title = "添加"+this.generalizeName+"的专区图片";
            },
            /*下路框值改变事件*/
            selectGet(){
                if (this.optionvalue == 1){
                    this.show_upload = true;
                } else{
                    this.show_upload = false;
                };
            },
            /*确定按钮*/
            goPost(){
                let data = {
                   /* generalizeRelationId:this.generalize_relation_id,*/
                    generalize_type:this.optionvalue,
                };
                let formDatas = new FormData();

                formDatas.append("file", this.imgFile);//文件上传的参数
                if (this.changeImg==false){
                    formDatas.append("type", 2);
                } else {
                    formDatas.append("type", 1);
                };


                if (this.addOrUpdate == 'add'){
                    this.$set(data, "generalizeId", this.generalizeid)
                    this.$set(data, "goodsId", this.goodsvalue)
                    formDatas.append("obj", JSON.stringify(data));
                    console.log(data);
                    addGeneralizerelation(formDatas).then(res => {
                        if (res.res){
                            this.$message({
                                type: 'success',
                                message: '新增成功!',
                                duration:2000
                            });
                            this.editVisible =false;
                            this.switchGeneralize(this.generalizeid);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '新增失败!',
                                duration:2000
                            });
                        }
                    })
                } else {
                    this.$set(data, "generalizeRelationId", this.generalize_relation_id)
                    formDatas.append("obj", JSON.stringify(data));
                    updateGeneralizerelation(formDatas).then(res => {
                        let formDatas2 = new FormData();
                        formDatas2.append("delete", this.delimg);
                        if (this.changeImg==false){

                        } else {
                            //删除服务器的旧图片
                            deletesb(formDatas2).then(res => {
                            })
                        };
                        if (res.res){
                            this.$message({
                                type: 'success',
                                message: '修改成功!',
                                duration:2000
                            });
                            this.editVisible =false;
                            this.switchGeneralize(this.generalizeid);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '修改失败!',
                                duration:2000
                            });
                        }
                    })
                };

            },
            handleSelect(item) {
                console.log(item);
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

            /*-------------------------------------------------------删除操作---*/
            handleEdit(index, row){
                let formDatas = new FormData();
                formDatas.append("id", row.generalizeRelationId);
                this.$confirm("确认要删除此关联商品吗？", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "info",
                    dangerouslyUseHTMLString: true,
                }).then(() => {
                    delGeneralizeGoods(formDatas).then(res => {
                        if (res.res){
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:2000
                            });
                            let formDatas2 = new FormData();
                            formDatas2.append("delete", row.generalizeGoodsImg);
                            //删除服务器的旧图片
                            deletesb(formDatas2).then(res => {
                            })
                            this.editVisible =false;
                            this.switchGeneralize(this.generalizeid);
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
        computed: {

        }
    }

</script>

<style scoped>
    .generalizeStatesb{
       cursor: default;
        color: white;
    }


    .generalize_mian_input{
        width: 80%;
        margin-left: 20px;
        margin-top: 10px;
    }
    .sbisb:hover{
       color: red;
    }
    .sbisb{
        transition: all 0.4s;
    }
    .generalize_mian_btnsb{

    }
    .addGoods{
        width: 100%;
        height: 50px;
        text-align: right;
        margin-left: -30px;
        margin-top: -10px;
       /* background: rebeccapurple;*/
    }
.generalize_mian_btn{
    margin-left: 20px;
    margin-top: 20px;
}
    .generalize_mian p{
        cursor: pointer;
        margin-left: 20px;
        margin-top: 5px;
    }
    .generalize_mian{
        width: 250px;
        min-height: 100px;
        background: #F5F5F5;
        text-align: left;
        font-size: 14px;
        font-weight: 200;
        padding-top: 19px;
        padding-bottom: 10px;
    }

    /*-------------------------------------上面的是专区的样式-*/
    .container{
        text-align: center;
        border: none;
        display: flex;
    }


    .mian_input_show-enter-active {
        animation: fadeInLeft 0.5s;
    }
    .mian_input_show-leave-active {
        animation: fadeInLeft 0.5s reverse;
    }
</style>

