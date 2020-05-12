<template>
    <div style="background: white;text-align: center">
        <el-form :model="goods" ref="goods" label-width="100px" class="demo-ruleForm">
            <div>
            <!--------------------------------------------------------查询条件---------->
            <div id="search_div">
                <!--日期-->
                <div class="block" style="width:340px;margin-left:20px">

                    <el-date-picker
                            v-model="goods.strartDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="创建日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <!--输入框-->
                <div style="width: 250px;margin-top: -32px;margin-left: 380px">
                    <el-autocomplete
                            class="inline-input"
                            v-model="goods.goodsName"
                            :fetch-suggestions="querySearch"
                            placeholder="根据商品名，描述搜索"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                            suffix-icon="el-icon-edit el-input__icon"
                            @keyup.enter.native="submit()"
                    ></el-autocomplete>
                </div>
                <!--分类下拉框-->
                <div style="width: 250px;margin-top: -32px;margin-left: 620px">
                 <!--   <el-select v-model="goods.goodsType3Id" placeholder="请选择">
                        <el-option
                                v-for="item in optionstype"
                                :key="item.goodstype3Id"
                                :label="item.goodstype3Name"
                                :value="item.goodstype3Id">
                        </el-option>
                    </el-select>-->
                    <el-cascader
                            :clearable="true"
                            :change-on-select="true"
                            :props="defaultParams"
                            :show-all-levels="false"
                            :options="options"
                            @change="handleChange"
                            @keyup.enter.native="goPost()" v-model="goods.goodsType3Id" placeholder="请选择分类">
                    </el-cascader>
                </div>
                <!---提交的按钮-->
                <div style="width: 50px;margin-top: -32px;margin-left: 870px">
                    <el-button icon="el-icon-search" @click="submit()"  circle></el-button>
                </div>

            </div>
                <!----------------------------------------------------------表格----->
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    :cell-style="rowClass"
                    :header-cell-style="headClass"
                    @selection-change="handleSelectionChange"
                    :default-sort = "{prop: 'goods_create'}"
                    style="width: 97%;margin: 0 auto">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column prop="goodsId" label="商品名" width="60"></el-table-column>

                <el-table-column prop="goodsName" label="商品名" width="140"></el-table-column>

                <el-table-column
                        label="商品简介"
                        width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.goodsDescribe }}</p>
                            <div slot="reference" class="name-wrapper" style="cursor: pointer">
                                <el-tag size="medium" type="success">这里看商品简介</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>


                <el-table-column
                        label="创建时间"
                        sortable
                        :sort-method="sortChange1"
                        width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{scope.row.goods_create | dateFilter}}</span>
                    </template>
                </el-table-column>


                <el-table-column prop="goodsRepertory" label="库存" width="80"></el-table-column>

                <el-table-column
                        label="版本信息"
                        width="90">
                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">
                                <div v-for="site in scope.row.versionsList" style="padding-bottom: 5px;margin-top: 5px">
                                    <label>{{site.versionsName}}:<span style="margin-left: 5px;color: red">{{site.versionsPrice}}</span><i>￥</i></label>
                                </div>
                            </div>
                            <i @click="showOther(scope.row.versionsList,scope.row.goodsName,scope.row.goodsId,scope.row.goodstype3.goodstype3Name)"  class="el-icon-c-scale-to-original" style="font-size: 20px;cursor: pointer"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>

                <el-table-column
                        label="展示图"
                        width="90">
                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">
                                <div v-for="site in scope.row.goodscolorList" style="padding-bottom: 5px;margin-top: 5px">
                                    <label>{{site.goodscolorName}}</span></label>
                                </div>
                            </div>
                            <i @click="showOtherColor(scope.row.goodscolorList,scope.row.goodsName,scope.row.goodsId)"  class="el-icon-picture-outline-round" style="font-size: 20px;cursor: pointer"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>


                <el-table-column
                        prop="goods_state"
                        label="商品状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.goods_state"
                                :active-value= 0
                                :inactive-value= 1
                                @change="changeSwitch(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column
                        label="所属分类"
                        width="110">
                    <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.goodstype3.goodstype3Name }}</el-tag>
                            </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">

                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                            <i class="el-icon-zoom-in"></i>
                            更多</el-button>

                        <span v-if="scope.row.goodstype3.goodstype3Id !='137'"></span>

                        <el-button v-if="scope.row.goodstype3.goodstype3Id =='137'"  size="mini" @click="showOtherParameter(scope.$index, scope.row)"  type="warning">
                            <i class="el-icon-postcard"></i>
                            参数</el-button>


                    </template>
                </el-table-column>

            </el-table>
        </div>
        </el-form>
        <!-----------------------------------------------------------分页-->
        <div class="block" id="pagination">
            <!--批量下架-->
            <div style="margin-top: 12px;margin-left: 19px;width: 250px">
                <el-button class="delgoods" :icon="updateStateIcon"  :type="updateStateType" @click="toggleSelection()" plain>{{updateStateText}}</el-button>
                <el-button class="addgoods" icon="el-icon-plus"  type="primary" @click="addGoods()" plain>新增商品</el-button>
            </div>

            <div style="margin-top: -31px">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[7, 10, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                </el-pagination>
            </div>
        </div>


        <!--子组件版本-->
        <vVersions :goods_id="goods_id" :isVisiblesb="sbsbsb" :othertitle="sbtitle" :gridData="gridData" :typename="typename" @getDatasb="getDatasb" @dialogVisibleEvent="showotherDialog" ></vVersions>
        <!--子组件颜色-->
        <vGoodsColor :goods_id="goods_id" :gridData2="gridData2" :othertitle="sbtitle2" :isVisiblesb="sbsbsb2" @getDatasb="getDatasbcolor" @dialogVisibleEvent="showotherDialogColor"></vGoodsColor>
        <!--子组件参数-->
        <vGoodsParametersb :isVisiblesb="sbsbsb3" @dialogVisibleEvent="showotherDialogParameter" :othertitle="sbtitle3" :form="gridData3" @getDatasb="getDataParm"></vGoodsParametersb>

        <vupdateGoods :isVisiblesb="sbsbsb4" @dialogVisibleEvent="showotherDialogUpdate" :othertitle="sbtitle4" :form="gridData4" :goodstype3="optionstypeToupdate" @getDatasb="getDataGoods" :type="updateOrAdd" :editVisiblesteps="editVisiblesteps"></vupdateGoods>
    </div>
</template>
<script>

    import { list } from '../../../api/goods'
    import { updateGodosState } from '../../../api/goods'
    import { Versionslist } from '../../../api/goods'
    import { GoodscolorlistById } from '../../../api/goods'

    import { getGoodsType } from '../../../api/goodstype'
    /*子组件们*/
    import vVersions from '../goods/GoodsVersions'
    import vGoodsColor from '../goods/GoodsColor'
    import vGoodsParametersb from '../goods/GoodsParameter'
    import vupdateGoods from '../goods/updateGoods'

    export default {
        components: {
            "vVersions": vVersions,
            "vGoodsColor": vGoodsColor,
            "vGoodsParametersb": vGoodsParametersb,
            "vupdateGoods": vupdateGoods,
        },
        data() {
            return {
                tableData: [],
                loading:true,
                /*分页数据*/
              /*  currentPage4:1,*/
                pageTotal:0,
                pageSize:"",
                pageIndex:1,
                /*日期*/
                pickerOptions: {
                    shortcuts: [{
                        text: '本月',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: '',
                value2: '',
                /*提示输入框*/
                restaurants: [],
                state2: '',
                /*分类下拉*/
                optionsvalue:"",
                optionstype:[],
                /*表单goods*/
                goods:{
                    strartDate:'',
                    goodsName:'',
                    goodsType3Id:'',
                },
                /*多选框*/
                multipleSelection: [],
                /*控制版本的子组件版本*/
                sbsbsb:false,
                sbtitle:"1",
                gridData:[],
                goods_id:"",
                typename:"",
                /*控制版本的子组件颜色*/
                sbsbsb2:false,
                gridData2:[],
                sbtitle2:"",
                //输入建议
                InputSearch:[],
                /*控制版本的子组件参数*/
                sbsbsb3:false,
                sbtitle3:"",
                gridData3:{},
                /*修改的组件*/
                sbsbsb4:false,
                sbtitle4:"",
                gridData4:"",
                optionstypeToupdate:{},

                /*批量下架要根据用户的操纵动态改变*/
                updateStateText:"批量下架",
                updateStateType:"danger",
                updateStateIcon:"el-icon-close",

                /*判断页面是修改还是新增*/
                updateOrAdd:"",
                /*步骤条*/
                editVisiblesteps:false,
                /*递归的分类信息*/
                options:[],
                defaultParams: {
                    label: 'name',
                    value: 'id',
                    children: 'childrensb'
                }
            }
        },
        created() {
            this.getData();
            this.getInputSearch();
        },
        methods: {
            sortChange1(a,b){
                return a.name-b.name  //获取name上的数据进行排序
            },
            // 获取数据
            getData(){

                let formDatas = new FormData();
                formDatas.append("page", this.pageIndex);
                formDatas.append("size", this.pageSize);
                if (this.goods.strartDate==null){
                    this.goods.strartDate="";
                } ;
                /*搜索*/
                formDatas.append("newobj", JSON.stringify(this.goods));

                list(formDatas).then(res => {
                    /*表格的数据*/
                    this.tableData = res.data;

                    /*分页的数据*/
                    this.pageTotal = res.page.total;
                    this.pageSize = res.page.size;
                    /*分类下拉框*/
                    this.optionstype = res.goodstype3List;


                    this.loading = false;
                    console.log(this.tableData);
                })
                /*递归的分类信息*/
                getGoodsType().then(res => {
                    this.options = res.atreeGoodsList;
                    console.log(this.options);
                })
            },
            /*拿到3级分类的id*/
            handleChange(value) {
                this.goods.goodsType3Id = value[2];
            },
            /*--------------------------------------------------------提交查询的按钮------*/
            submit(){

                //每次查询页码都是1开始
                this.pageIndex = 1;
                this.loading = true;
                this.getData();
            },
            /*-------------------------------------------------------分页操作----*/
            handleSizeChange(val) {
                this.loading = true;
                this.pageSize = val;
                this.getData();
              /*  console.log(`每页: ${val}`);*/
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pageIndex = val;
                this.getData();
               /* console.log(`当前页: ${val}`);*/
            },
            /*===========================================================新增商品=*/
            addGoods(){
                this.sbsbsb4 = true;
                this.sbtitle4 = "新增商品";
                this.gridData4 = {goodsName:"",goodsRepertory:"",goodsDescribe:"",goodsType3Id:"",goodsExplain:"",goodsInfo:""};
                this.optionstypeToupdate = this.optionstype;
                this.updateOrAdd = "add";
                this.editVisiblesteps = true;
            },
            /*---------====================================================================版本抽屉-------*/
            showOther(data,name,goodsbid,typename){
                this.goods_id = goodsbid;
                this.sbtitle = name+"的版本信息";
                this.gridData = data;
                /*this.props.othertable = true;*/
                this.sbsbsb = true;
                this.typename = typename;
            },
            /*控制版本的子组件显示*/
            showotherDialog(visible) {
                this.sbsbsb = visible;
            },
            getDatasb(id){
                let formDatas = new FormData();
                formDatas.append("goodsId", id);
                Versionslist(formDatas).then(res => {
                    this.gridData = res.versionsList;
                })
                this.getData();
            },
            /*-------------------颜色*/
            showOtherColor(data,name,goodsbid){
                this.goods_id = goodsbid;
                this.sbtitle2 = name+"的展示图信息";
                this.sbsbsb2 = true;
                this.gridData2 = data;
            },
            /*控制版本的子组件显示*/
            showotherDialogColor(visible) {
                this.sbsbsb2 = visible;
            },
            getDatasbcolor(id){
                let formDatas = new FormData();
                formDatas.append("goodsId", id);
                GoodscolorlistById(formDatas).then(res => {
                    this.gridData2 = res.goodscolorList;
                    console.log(this.gridData2)
                })
                this.getData();
            },
            /*-----------------------------参数*/
            showOtherParameter(index,row){
                this.sbsbsb3 = true;
                if (row.parameter.parameterId==undefined){
                    this.sbtitle3 = "请填写"+row.goodsName+"的参数数据";
                }else {
                    this.sbtitle3 = row.goodsName+"的参数数据";
                }

                this.gridData3 = row.parameter;
            },
            showotherDialogParameter(visible){
                this.sbsbsb3 = visible;
            },
            getDataParm(){
                this.getData();
            },
            /*--------------------------------------修改的组件*/
            handleEdit(index, row) {
                this.sbsbsb4 = true;
                this.sbtitle4 = "编辑"+row.goodsName+"的基本信息";
                this.gridData4 = row;
                this.optionstypeToupdate = this.optionstype;
                this.updateOrAdd = "update";
                this.editVisiblesteps = false;
            },
            showotherDialogUpdate(visible){
                this.sbsbsb4= visible;
            },
            getDataGoods(){

                this.getData();

            },
            /*-----------------------------------------------------------输入提示-------*/
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return this.InputSearch;
            },
            /*----------------------------------------------------------得到所有的输入建议数据-------------*/
            getInputSearch(){
                let formDatas = new FormData();
                formDatas.append("page", this.pageIndex);
                formDatas.append("size", 10000);
                formDatas.append("newobj", JSON.stringify(this.goods));
                list(formDatas).then(res => {
                    this.InputSearch = res.inputSearcheslist;
                    this.restaurants = this.loadAll();
                })
            },
            handleSelect(item) {
                console.log(item);
            },

            /*----------------------------------------------------------监听开关-----*/
            changeSwitch(data){
                let content = "";
                let stateSumilt = 0;//传给后台的state
                if (data.goods_state=="1"){
                    stateSumilt = 1;
                    content ='确定要'+"<lable style=\"color: red\">下架</lable>"+'选中的商品吗？';
                } else {
                    stateSumilt = 0;
                    content ='确定要'+"<lable style=\"color: blue\">上架</lable>"+'选中的商品吗？';
                };
                this.$confirm(content, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "info",
                    dangerouslyUseHTMLString: true,
                    center: true
                }).then(() => {
                    let formDatas = new FormData();
                    formDatas.append("idss", data.goodsId);
                    formDatas.append("state", stateSumilt);
                    updateGodosState(formDatas).then(res => {
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
                    data.goods_state = 0;//点击取消后开关不会变
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
            /*-------------------------------------------------------多选框的操作----*/
            toggleSelection() {
                let  list = [];
                let list2= [];
                let isArrary = "";//判断状态数组里的数据是否是一致
                let statelist = "";
                let stateSumilt = 0;//传给后台的state
                let content = "";
                //吧选中的id装进数组
                for (const listElement of this.multipleSelection) {
                    statelist = listElement.goods_state;
                    list.push(listElement.goodsId);
                    list2.push(listElement.goods_state);
                }

                /*不为空*/
                if (this.multipleSelection==""){
                    this.$message({
                        message: '什么都没选呢',
                        type: 'warning'
                    });
                    return;;
                } ;

                /*判断状态数组里的数据是否是一致的*/
                let sbsb = "";
                for (let i =0;i<list2.length;i++){
                    if (i==0){
                        sbsb=list2[i];
                    }else {
                        /*不一致*/
                        if (sbsb != list2[i]){
                            isArrary = "0";
                            /*一致*/
                        }else {
                            isArrary = "1";
                        };
                    };
                } ;

                /*如果判断状态数组里的数据不是一致的，reurn退出*/
                if (isArrary=="0"){
                    this.$message({
                        message: '选中的商品状态不一致',
                        type: 'warning'
                    });
                    return;
                };

                if (statelist=="0"){
                    stateSumilt = 1;
                    content ='确定要'+"<lable style=\"color: red\">下架</lable>"+'所有选中的商品吗？';
                } else {
                    stateSumilt = 0;
                    content ='确定要'+"<lable style=\"color: blue\">上架</lable>"+'所有选中的商品吗？';
                };


                this.$confirm(content, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "info",
                    dangerouslyUseHTMLString: true,
                    center: true
                }).then(() => {
                    let formDatas = new FormData();
                    formDatas.append("idss", list);
                    formDatas.append("state", stateSumilt);
                    updateGodosState(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:2000
                            });

                            if (statelist=="0"){
                                this.updateStateText = "批量上架";
                                this.updateStateType = "success";
                                this.updateStateIcon = "el-icon-check";
                            } else {
                                this.updateStateText = "批量下架";
                                this.updateStateType = "danger";
                                this.updateStateIcon = "el-icon-close";
                            };
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
                    /*data.state = 0;//点击取消后开关不会变*/
                });





            },
            /*全选*/
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

        },
    }
</script>

<style scoped>
    /*-------------------------------------------------新增商品的按钮样式---------*/
    .addgoods{
        margin-left: 19px;
    }
    .delgoods{
        margin-left: -40px;
    }
    /*------------------------------------------搜索div的样式------------------*/
    #search_div{
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    /*------------------------------------------------------分页的样式---*/
    #pagination{
        width: 100%;

        padding-bottom: 10px;
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
        width: 178px;
        height: 178px;
        display: block;
    }
    body{
        overflow-x: hidden;
    }
</style>
