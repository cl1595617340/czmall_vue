<template>
    <div style="background: white;text-align: center;width: 100%">
        <div class="container">
            <div class="search_div">
                <!--输入框-->
                <div style="width: 250px;margin-left: -18px">
                    <el-autocomplete
                            class="inline-input"
                            v-model="member.memberName"
                            :fetch-suggestions="querySearch"
                            placeholder="根据会员名搜索"
                            :trigger-on-focus="false"
                            suffix-icon="el-icon-edit el-input__icon"
                            @select="handleSelect"
                            @keyup.enter.native="submit()"
                    ></el-autocomplete>
                </div>
                <!---提交的按钮-->
                <div style="    width: 50px;margin-left: 230px;margin-top: -32px;">
                    <el-button type="primary" icon="el-icon-search" @click="submit">搜索</el-button>
                </div>
            </div>
            <!----------------------------------------------------------表格----->
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    :cell-style="rowClass"
                    :header-cell-style="headClass"
                    style="width: 100%;margin: 0 auto">
                <el-table-column prop="memberId" label="会员id" width="60"></el-table-column>

                <el-table-column prop="memberName" label="会员名" width="106"></el-table-column>

                <!--图片-->
                <el-table-column
                        prop="avatar"
                        label="头像"
                        width="112">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 35px; height: 35px"
                                class="table-td-thumb"
                                :src="scope.row.avatar"
                                :preview-src-list="[scope.row.avatar]">
                            <div slot="error">
                                <el-image  fit="cover" src="static/images/shuchai/wu.png" :preview-src-list="['static/images/shuchai/wu.png']">
                                </el-image>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>

                <!--x性别-->
                <el-table-column prop="sex"   label="性别" width="70px" show-overflow-tooltip align="center">
                    <template scope="scope">
                        <p v-if="scope.row.sex=='m'">男</p>
                        <p v-if="scope.row.sex=='f'">女</p>
                    </template>
                </el-table-column>

                <el-table-column prop="birthday" label="出生日期" width="120"></el-table-column>

                <el-table-column prop="memberProvince" label="地区(省)" width="80"></el-table-column>

                <el-table-column prop="membercity" label="地区(市)" width="80"></el-table-column>


                <el-table-column
                        label="状态"
                        width="110">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <p v-if="scope.row.memberState==0">
                                <el-tag size="medium">已启用</el-tag>
                            </p>
                            <p v-if="scope.row.memberState==1">
                                <el-tag size="medium" type="danger">已停用</el-tag>
                            </p>
                        </div>
                    </template>
                </el-table-column>


                <el-table-column prop="memberipone" label="安全手机" width="140"></el-table-column>

                <el-table-column
                        label="商品简介"
                        width="140">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.memberpwd }}</p>
                            <div slot="reference" class="name-wrapper" style="cursor: pointer">
                                <el-tag size="medium" type="warning">查看密码</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>


                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.memberState==0">
                            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">
                                <i class="el-icon-delete"></i>
                                停用</el-button>
                            <!--地址-->
                            <el-button size="mini" @click="goAddress(scope.$index, scope.row)">
                                <i class="el-icon-s-check"></i>
                                地址</el-button>
                        </span>
                        <span v-if="scope.row.memberState==1">
                            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">
                                 <i class="el-icon-refresh-left"></i>
                                启用</el-button>
                            <!--地址-->
                            <el-button size="mini" @click="goAddress(scope.$index, scope.row)">
                                   <i class="el-icon-s-check"></i>
                                地址</el-button>
                        </span>

                    </template>
                </el-table-column>

            </el-table>

        </div>
        <!-----------------------------------------------------------分页-->
        <div class="block" id="pagination">
            <div style="margin-top: -15px">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[2, 10, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                </el-pagination>
            </div>
        </div>

        <vAddress :isVisiblesb="sbsbsb3" @dialogVisibleEvent="showoaddress" :othertitle="addresstitle" :gridData="gridData"></vAddress>
    </div>
</template>

<script>
    import { getmemberlist } from '../../../api/member'
    import { updateMemberState } from '../../../api/member'
    /*组件*/
    import vAddress from '../member/address'
    export default {
        components: {
            "vAddress": vAddress,
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
                /*控制组件的属性*/
                sbsbsb3:false,
                addresstitle:"",
                gridData:{},
                /*搜索*/
                member:{
                    memberName:"",
                },
                //输入建议
                InputSearch:[],

            }
        },
        created() {
            this.getData();
            this.getInputSearch();
        },
        methods: {
            getData(){
                let formDatas = new FormData();
                formDatas.append("page", this.pageIndex);
                formDatas.append("size", this.pageSize);
                formDatas.append("newobj", JSON.stringify(this.member));
                getmemberlist(formDatas).then(res => {
                    /*表格的数据*/
                    this.tableData = res.data;
                    /*分页的数据*/
                    this.pageTotal = res.page.total;
                    this.pageSize = res.page.size;
                    this.loading = false;
                })
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
                formDatas.append("newobj", JSON.stringify(this.member));
                getmemberlist(formDatas).then(res => {
                    this.InputSearch = res.inputSearcheslist;
                    this.restaurants = this.loadAll();
                })
            },
            handleSelect(item) {
                console.log(item);
            },

            /*查询*/
            submit(){
                this.getData();
            },
            /*---------------------------------------------------------去到会员的地址-------*/
            goAddress(index, row){
                this.sbsbsb3 = true;
                this.addresstitle = row.memberName+"的地址信息";
                this.gridData = row.addressList;
            },
            showoaddress(visible){
                this.sbsbsb3 = visible;
            },
            /*-------------------------------------------------------编辑操作---*/
            handleEdit(index, row){
                let state = -1;//发送到后端的状态
                let content = "";//状态文字
                if (row.memberState==0){
                    state = 1;
                    content = "确认要<lable style=\"color: red\">停用</lable>此会员吗？";
                } else {
                    state = 0;
                    content = "确认要<lable style=\"color: blue\">启用</lable>此会员吗？";
                };
                let formDatas = new FormData();
                formDatas.append("id", row.memberId);
                formDatas.append("state", state);

                this.$confirm(content, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "info",
                    dangerouslyUseHTMLString: true,
                }).then(() => {
                    updateMemberState(formDatas).then(res => {
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
                            this.getData();
                        }
                    })
                    /*取消按钮*/
                }).catch(() => {

                });


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
    .search_div{
        width: 100%;
        height: 40px;
        /*background: wheat;*/
        position: relative;
        top: -12px;
    }
    /*------------------------------------上面是搜索的样式----*/
    #pagination{
        width: 100%;
        padding-bottom: 10px;
        margin: 0 auto;

    }
    /*-------------------------------------上面的是分页的样式-*/
    .container{
        text-align: center;
        border: none;
    }
</style>

