<template>
    <div style="background: white;text-align: center;width: 100%">
        <div class="container">
            <div class="search_div">
                <!--输入框-->
                <div style="width: 250px;margin-left: -18px">
                    <el-autocomplete
                            class="inline-input"
                            v-model="order.orderNum"
                            :fetch-suggestions="querySearch"
                            placeholder="根据订单号搜索"
                            :trigger-on-focus="false"
                            suffix-icon="el-icon-news"
                            @select="handleSelect"
                            @keyup.enter.native="submit()"
                    ></el-autocomplete>
                </div>
                <!--输入框-->
                <div style="width: 250px;margin-left: -18px">
                    <el-autocomplete
                            class="inline-input"
                            v-model="order.memberName"
                            :fetch-suggestions="querySearch"
                            placeholder="根据会员名搜索"
                            :trigger-on-focus="false"
                            suffix-icon="el-icon-user"
                            @select="handleSelect"
                            @keyup.enter.native="submit()"
                    ></el-autocomplete>
                </div>

                <!--订单状态下拉框-->
                <div>
                    <el-select style="width: 200px" v-model="order.orderState" placeholder="请选择">
                        <el-option
                                v-for="item in optionstype"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <!---提交的按钮-->
                <div style="width: 50px;margin-left: 20px;">
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
                    :default-sort = "{prop: 'goods_create'}"
                    style="width: 100%;margin: 0 auto">
                <el-table-column prop="orderId" label="订单id" width="60"></el-table-column>

                <el-table-column prop="orderNum" label="订单号" width="130"></el-table-column>

                <!---->
                <el-table-column  label="下单用户" width="90px" show-overflow-tooltip align="center">
                    <template scope="scope">
                        <p v-for="(site,index) in scope.row.orderRelationList" v-if="index==0">
                            {{site.member.memberName}}
                        </p>
                    </template>
                </el-table-column>

                <!--图片-->
                <el-table-column
                        prop="avatar"
                        label="头像"
                        width="112">
                    <template slot-scope="scope">
                        <p v-for="(site,index) in scope.row.orderRelationList" v-if="index==0">
                            <el-image
                                    style="width: 35px; height: 35px"
                                    class="table-td-thumb"
                                    :src="site.member.avatar"
                                    :preview-src-list="[site.member.avatar]">
                                <div slot="error">
                                    <el-image  fit="cover" src="static/images/shuchai/wu.png" :preview-src-list="['static/images/shuchai/wu.png']">
                                    </el-image>
                                </div>
                            </el-image>
                        </p>
                    </template>
                </el-table-column>


                <el-table-column  label="订单总金额" width="100px" show-overflow-tooltip align="center">
                    <template scope="scope">
                        <p>￥{{scope.row.orderPrice}}.00</p>
                    </template>
                </el-table-column>

                <el-table-column  label="订单总数量" width="90px" show-overflow-tooltip align="center">
                    <template scope="scope">
                        <p>{{scope.row.orderCount}}件</p>
                    </template>
                </el-table-column>

                <el-table-column
                        sortable
                        :sort-method="sortChange1"
                        label="创建时间"
                        width="92">
                    <template slot-scope="scope">
                        <span >{{scope.row.orderFound}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        sortable
                        :sort-method="sortChange1"
                        label="支付时间"
                        width="92">
                    <template slot-scope="scope">
                        <p v-if="scope.row.orderPaydate=='暂无'">
                            <span>暂无</span>
                        </p>
                        <p v-if="scope.row.orderPaydate!='暂无'">
                            <span>{{scope.row.orderPaydate}}</span>
                        </p>
                    </template>
                </el-table-column>

                <el-table-column
                        sortable
                        :sort-method="sortChange1"
                        label="完成时间"
                        width="92">
                    <template slot-scope="scope">
                        <p v-if="scope.row.orderpayok2=='暂无'">
                            <span>暂无</span>
                        </p>
                        <p v-if="scope.row.orderpayok2!='暂无'">
                            <span>{{scope.row.orderpayok2}}</span>
                        </p>

                    </template>
                </el-table-column>



                <el-table-column
                        label="订单状态"
                        width="116">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <p v-if="scope.row.orderState==0">
                                <el-tag size="medium"  type="warning">待支付</el-tag>
                            </p>
                            <p v-if="scope.row.orderState==1">
                                <el-tag size="medium"type="primary">待收货</el-tag>
                            </p>
                            <p v-if="scope.row.orderState==2">
                                <el-tag size="medium" type="success">完成</el-tag>
                            </p>
                            <p v-if="scope.row.orderState==3">
                                <el-tag size="medium" type="danger">已取消</el-tag>
                            </p>
                        </div>
                    </template>
                </el-table-column>



                <el-table-column label="更多" width="224">
                    <template slot-scope="scope">
                        <span>
                            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">
                                <i class="el-icon-info"></i>
                                详细信息</el-button>
                          <!--  &lt;!&ndash;地址&ndash;&gt;
                            <el-button size="mini" @click="goAddress(scope.$index, scope.row)">
                                <i class="el-icon-s-check"></i>
                                发票信息</el-button>-->

                            <el-button v-if="scope.row.orderState==1&&scope.row.order_send==0" size="mini" type="primary" @click="ordersend(scope.$index, scope.row)">
                                <i class="el-icon-upload2"></i>
                                待发货</el-button>

                            <el-button v-if="scope.row.orderState==1&&scope.row.order_send==1" disabled size="mini" type="success" @click="ordersend(scope.$index, scope.row)">
                                <i class="el-icon-circle-check"></i>
                                已发货</el-button>

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
                        :page-sizes="[6, 10, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                </el-pagination>
            </div>
        </div>

        <!-- ----------------------------------------------------------------------编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="45%">

            <div style="display: flex;">
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">订单号：</p>
                    <p style="width: 140px">{{orderrelationData2.orderNum}}</p>
                </div>
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">订单状态：</p>
                    <p style="width: 140px" v-if="orderrelationData2.orderState==0">
                        <el-tag type="warning">待支付</el-tag>
                    </p>
                    <p style="width: 140px" v-if="orderrelationData2.orderState==1">
                        <el-tag type="primary">待收货</el-tag>
                    </p>
                    <p style="width: 140px" v-if="orderrelationData2.orderState==2">
                        <el-tag type="success">完成</el-tag>
                    </p>
                    <p style="width: 140px" v-if="orderrelationData2.orderState==3">
                        <el-tag type="danger">已取消</el-tag>
                    </p>
                </div>
            </div>

            <div style="display: flex;">
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">创建时间：</p>
                    <p style="width: 140px">{{orderrelationData2.orderFound}}</p>
                </div>
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">支付方式：</p>
                    <p style="width: 140px" v-if="orderrelationData2.orderPaytype==0">
                        <el-tag>支付宝</el-tag>
                    </p>
                    <p style="width: 140px" v-if="orderrelationData2.orderPaytype==1">
                        <el-tag >花呗</el-tag>
                    </p>
                </div>
            </div>

            <div style="display: flex;">
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">支付时间：</p>
                    <p style="width: 140px">{{orderrelationData2.orderPaydate}}</p>
                </div>
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">完成时间：</p>
                    <p style="width: 140px">{{orderrelationData2.orderpayok2}}</p>
                </div>
            </div>

            <!--地址划线-->
            <div v-for="(sitesb,index) in orderrelationData2.orderRelationList" v-if="index==0" style="display: flex;border-top: 1px #F5F5F5 solid;margin-top: 15px">
                <div  style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">收件人：</p>
                    <p style="width: 140px">{{sitesb.address.addressName}}</p>
                </div>
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">联系电话：</p>
                    <p style="width: 140px">{{sitesb.address.addressIpone}}</p>
                </div>
            </div>
            <div v-for="(sitesb,index) in orderrelationData2.orderRelationList" v-if="index==0" style="display: flex;">
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">配送方式：</p>
                    <p style="width: 140px">快递</p>
                </div>
            </div>
            <div style="display: flex;" v-for="(sitesb,index) in orderrelationData2.orderRelationList" v-if="index==0">
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">配送地址：</p>
                    <p style="width: 300px">{{sitesb.address.addressProvince}} {{sitesb.address.addressCity}} {{sitesb.address.addressinfo}}</p>
                </div>
            </div>

            <!--发票-->
            <div style="display: flex;border-top: 1px #F5F5F5 solid;margin-top: 15px">
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">发票类型：</p>
                    <p style="width: 140px" v-if="orderrelationData2.orderInvoicetype==0">
                        <el-tag>个人</el-tag>
                    </p>
                    <p style="width: 140px" v-if="orderrelationData2.orderInvoicetype==1">
                        <el-tag>公司</el-tag>
                    </p>
                </div>
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">发票信息：</p>
                    <p style="width: 140px">{{orderrelationData2.orderCompany}}</p>
                </div>
            </div>


            <!--商品划线-->
            <div style="display: flex;border-top: 1px #F5F5F5 solid;margin-top: 15px">
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">商品清单：</p>
                </div>

            </div>
            <div style="display: flex;margin-top: 20px">
                <el-table
                        :data="orderrelationData"
                        style="width: 100%"
                        height="250">
                    <el-table-column
                            fixed
                            prop="goods.goodsId"
                            label="商品ID"
                            width="70">
                    </el-table-column>

                    <!--图片-->
                    <el-table-column
                            label="商品图"
                            width="90">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 35px; height: 35px"
                                    class="table-td-thumb"
                                    :src="scope.row.goodscolor.goodscolorPicture"
                                    :preview-src-list="[scope.row.goodscolor.goodscolorPicture]">
                                <div slot="error">
                                    <el-image  fit="cover" src="static/images/shuchai/wu.png" :preview-src-list="['static/images/shuchai/wu.png']">
                                    </el-image>
                                </div>
                            </el-image>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="goods.goodsName"
                            label="商品名字"
                            width="120">
                    </el-table-column>

                    <el-table-column
                            prop="goodscolor.goodscolorName"
                            label="商品颜色"
                            width="90">
                    </el-table-column>

                    <!--图片-->
                    <el-table-column
                            label="赠品图"
                            width="90">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 35px; height: 35px"
                                    class="table-td-thumb"
                                    :src="scope.row.relationCompimg"
                                    :preview-src-list="[scope.row.relationCompimg]">
                                <div slot="error">
                                    <el-image  fit="cover" src="static/images/shuchai/wu.png" :preview-src-list="['static/images/shuchai/wu.png']">
                                    </el-image>
                                </div>
                            </el-image>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="relationCompname"
                            label="赠品名"
                            width="90">
                    </el-table-column>

                    <el-table-column
                            prop="versions.versionsName"
                            label="商品版本"
                            width="90">
                    </el-table-column>

                    <el-table-column
                            prop="versions.versionsPrice"
                            label="价格(￥)"
                            width="90">
                    </el-table-column>


                    <el-table-column
                            prop="relation_count"
                            label="购买数量(件)"
                            width="90">
                    </el-table-column>

                </el-table>
            </div>

            <!--总金额-->
            <div style="display: flex;border-top: 1px #F5F5F5 solid;margin-top: 15px">
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">总数量：</p>
                    <p style="width: 140px">{{orderrelationData2.orderCount}}</p>
                </div>
                <div style="display: flex;margin-left: 35px;text-align: left;margin-top: 10px">
                    <p style="width: 100px">总金额：</p>
                    <p style="width: 140px">￥{{orderrelationData2.orderPrice}}.00</p>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getmemberlist } from '../../../api/member'
    import { updateMemberState } from '../../../api/member'

    import { getorderlist } from '../../../api/order'
    import { updateOrderSend } from '../../../api/order'
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
                order:{
                    orderNum:"",
                    memberName:"",
                    orderState:"",
                },
                //输入建议
                InputSearch:[],
                optionstype:[
                    {value:"",text:"全部状态"},
                    {value:0,text:"待支付"},
                    {value:1,text:"待收货"},
                    {value:2,text:"完成"},
                    {value:3,text:"已取消"},
                ],
                title:'',
                editVisible:false,
                /*详细信息表格的数据*/
                orderrelationData:[],
                /*详细信息的数据*/
                orderrelationData2:{},
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
            getData(){
                let formDatas = new FormData();
                formDatas.append("page", this.pageIndex);
                formDatas.append("size", this.pageSize);
                formDatas.append("newobj", JSON.stringify(this.order));
                getorderlist(formDatas).then(res => {
                    console.log(res.data);
                    /*表格的数据*/
                    this.tableData = res.data;
                    /*分页的数据*/
                    this.pageTotal = res.page.total;
                    this.pageSize = res.page.size;
                    this.loading = false;
                })
            },
            /*如果订单状态位1并且发送状态也是1，就出现待收货，就出现发货*/
            ordersend(index,row){
                let formDatas = new FormData();
                formDatas.append("id", row.orderId);

                this.$confirm("确定发货吗?", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "info",
                    dangerouslyUseHTMLString: true,

                }).then(() => {
                    updateOrderSend(formDatas).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: '发货成功!',
                                duration:2000
                            });
                            this.getData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '失败!',
                                duration:2000
                            });
                            this.getData();
                        }
                    })
                    /*取消按钮*/
                }).catch(() => {

                });
            },
            /*----------详细信息-*/
            handleEdit(index,row){
                this.editVisible = true;
                this.title = row.memberName+"会员,订单号"+row.orderNum+'的详细信息';
                this.orderrelationData2 = row;
                this.orderrelationData = row.orderRelationList;
                console.log(row);
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
                /*formDatas.append("newobj", JSON.stringify(this.order));*/
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
                this.pageIndex=1;
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
        display: flex;
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

